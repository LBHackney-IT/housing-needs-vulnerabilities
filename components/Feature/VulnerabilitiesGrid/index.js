import { useState, useMemo, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxList,
  TextInput
} from 'components/Form';
import ResourceCard from './ResourceCard';
import groups from './grid.json';

function createLookup() {
  const lookup = new Map();

  groups.forEach(group => {
    const { name, assets, vulnerabilities } = group;
    const values = new Set();

    assets
      .concat(vulnerabilities)
      .map(item => item.label)
      .concat(group.name)
      .forEach(value => values.add(value));

    lookup.set(name, values);
  });

  return lookup;
}

const VulnerabilitiesGrid = ({ resources, onUpdate }) => {
  const [grid, setGrid] = useState({
    assets: {},
    vulnerabilities: {},
    data: {}
  });
  const groupItems = useMemo(() => createLookup());

  const addItem = (obj, key, value) => {
    return {
      ...obj,
      [key]: { name: value, data: {} }
    };
  };

  const removeItem = (obj, key) => {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => k != key));
  };

  const addDataItem = (obj, key, value, label, cbId) => {
    obj[cbId].data[key] = {
      label,
      value
    };
    return obj;
  };

  const removeDataItem = (obj, cbId, key) => {
    obj[cbId].data = Object.fromEntries(
      Object.entries(obj[cbId].data).filter(([k]) => k != key)
    );
    return obj;
  };

  const updateAssets = (key, value, isTextInput) => {
    let newAssets;

    if (isTextInput) {
      newAssets = value
        ? addItem(grid.assets, key, value)
        : removeItem(grid.assets, key);
    } else {
      newAssets = grid.assets[key]
        ? removeItem(grid.assets, key)
        : addItem(grid.assets, key, value);
    }

    updateGrid({ assets: newAssets });
  };

  const updateVulnerabilities = ({
    key,
    value,
    isTextInput,
    label,
    parentId,
    type
  }) => {
    let newVulns;

    if (isTextInput) {
      if (value) {
        if (type === 'other') {
          newVulns = addItem(grid.vulnerabilities, key, value);
        } else {
          newVulns = addDataItem(
            grid.vulnerabilities,
            key,
            value,
            label,
            parentId
          );
        }
      } else {
        if (type === 'other') {
          newVulns = removeItem(grid.vulnerabilities, key);
        } else {
          newVulns = removeDataItem(grid.vulnerabilities, parentId, key);
        }
      }
    } else {
      newVulns = grid.vulnerabilities[key]
        ? removeItem(grid.vulnerabilities, key)
        : addItem(grid.vulnerabilities, key, value);
    }
    updateGrid({ vulnerabilities: newVulns });
  };

  useEffect(() => {
    onUpdate({
      assets: Object.values(grid.assets).filter(a => a.name !== 'Other'),
      vulnerabilities: Object.values(grid.vulnerabilities)
        .filter(v => v.name !== 'Other')
        .map(v => ({ ...v, data: Object.values(v.data) }))
    });
  }, [grid]);

  const updateGrid = patch => setGrid(grid => ({ ...grid, ...patch }));

  const labelToId = label =>
    label
      .replace(/ /g, '-')
      .replace(/\//g, '-')
      .toLowerCase();

  const filterResources = groupName => {
    const group = groupItems.get(groupName);

    const targets = Object.values({
      ...grid.assets,
      ...grid.vulnerabilities
    })
      .filter(value => group.has(value.name))
      .map(value => value.name);

    return resources.filter(resource => {
      return (
        resource.tags.find(tag => targets.includes(tag)) ||
        (targets.length > 0 && resource.tags.includes(groupName))
      );
    });
  };

  return (
    <Accordion title="Things to explore with the resident">
      {groups.map(({ id, name, assets, vulnerabilities }) => (
        <AccordionItem key={id} id={id} heading={name}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third">
              <CheckboxList className="vulnerability">
                {vulnerabilities.map(({ label, textinputs }) => {
                  const cbId = `${id}-v-${labelToId(label)}`;
                  const cbLabel = label;
                  return (
                    <React.Fragment key={cbId}>
                      <Checkbox
                        label={label}
                        name={cbId}
                        onClick={() =>
                          updateVulnerabilities({
                            key: cbId,
                            value: label,
                            isTextInput: false
                          })
                        }
                      />
                      {textinputs &&
                        grid.vulnerabilities[cbId] &&
                        textinputs.map(({ label, type }) => {
                          const inputId = `${cbId}-${labelToId(label)}-i`;
                          return (
                            <React.Fragment key={inputId}>
                              <p id={`${inputId}-aria`} hidden>
                                This is a text input for {cbLabel}: {label}
                              </p>
                              <TextInput
                                name={inputId}
                                label={label}
                                onChange={value =>
                                  updateVulnerabilities({
                                    key: inputId,
                                    value,
                                    isTextInput: true,
                                    label,
                                    parentId: cbId,
                                    type
                                  })
                                }
                                aria={`${inputId}-aria`}
                              />
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  );
                })}
              </CheckboxList>
            </div>
            <div className="govuk-grid-column-one-third">
              <CheckboxList className="asset">
                {assets.map(({ label, textinputs }) => {
                  const cbId = `${id}-a-${labelToId(label)}`;
                  return (
                    <React.Fragment key={cbId}>
                      <Checkbox
                        label={label}
                        name={cbId}
                        onClick={() => updateAssets(cbId, label, false)}
                      />
                      {textinputs &&
                        grid.assets[cbId] &&
                        textinputs.map(({ label }) => {
                          const inputId = `${cbId}-${labelToId(label)}-i`;
                          return (
                            <TextInput
                              name={inputId}
                              key={inputId}
                              label={label}
                              onChange={val => updateAssets(inputId, val, true)}
                            />
                          );
                        })}
                    </React.Fragment>
                  );
                })}
              </CheckboxList>
            </div>
            <div className="govuk-grid-column-one-third">
              {filterResources(name).map(resource => (
                <ResourceCard
                  key={resource.id}
                  data-testid={`resource-${resource.id}`}
                  {...resource}
                />
              ))}
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default VulnerabilitiesGrid;
