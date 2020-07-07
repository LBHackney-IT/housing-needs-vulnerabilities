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

  const addItem = ({ obj, key, value }) => {
    return {
      ...obj,
      [key]: { name: value, data: {} }
    };
  };

  const removeItem = ({ obj, key }) => {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => k != key));
  };

  const addDataItem = ({ obj, key, value, label, parentKey }) => {
    obj[parentKey].data[key] = {
      label,
      value
    };
    return obj;
  };

  const removeDataItem = ({ obj, parentKey, key }) => {
    obj[parentKey].data = Object.fromEntries(
      Object.entries(obj[parentKey].data).filter(([k]) => k != key)
    );
    return obj;
  };

  const updateSelectedCheckboxes = ({ gridType, key, value }) => {
    updateGrid({
      [gridType]: grid[gridType][key]
        ? removeItem({ obj: grid[gridType], key })
        : addItem({ obj: grid[gridType], key, value })
    });
  };

  const updateTextData = ({
    gridType,
    key,
    parentKey,
    label,
    value,
    inputType
  }) => {
    if (inputType === 'other') {
      updateGrid({
        [gridType]: value
          ? addItem({ obj: grid[gridType], key, value })
          : removeItem({ obj: grid[gridType], key })
      });
    } else {
      updateGrid({
        [gridType]: value
          ? addDataItem({ obj: grid[gridType], key, value, label, parentKey })
          : removeDataItem({ obj: grid[gridType], parentKey, key })
      });
    }
  };

  useEffect(() => {
    onUpdate({
      assets: Object.values(grid.assets)
        .filter(a => a.name !== 'Other')
        .map(a => ({ ...a, data: Object.values(a.data) })),
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
      {groups.map(({ id, name, assets, vulnerabilities }) => {
        const selectedVulnerabilities = Object.keys(
          grid.vulnerabilities
        ).some(key => key.includes(id));
        const selectedAssets = Object.keys(grid.assets).some(key =>
          key.includes(id)
        );
        return (
          <AccordionItem
            key={id}
            id={id}
            heading={name}
            selectedVulnerabilities={selectedVulnerabilities}
            selectedAssets={selectedAssets}
          >
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
                            updateSelectedCheckboxes({
                              gridType: 'vulnerabilities',
                              key: cbId,
                              value: label
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
                                    updateTextData({
                                      key: inputId,
                                      value,
                                      label,
                                      parentKey: cbId,
                                      inputType: type,
                                      gridType: 'vulnerabilities'
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
                          onClick={() =>
                            updateSelectedCheckboxes({
                              gridType: 'assets',
                              key: cbId,
                              value: label
                            })
                          }
                        />
                        {textinputs &&
                          grid.assets[cbId] &&
                          textinputs.map(({ label, type }) => {
                            const inputId = `${cbId}-${labelToId(label)}-i`;
                            return (
                              <TextInput
                                name={inputId}
                                key={inputId}
                                label={label}
                                onChange={value =>
                                  updateTextData({
                                    key: inputId,
                                    value,
                                    label,
                                    parentKey: cbId,
                                    inputType: type,
                                    gridType: 'assets'
                                  })
                                }
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
        );
      })}
    </Accordion>
  );
};

export default VulnerabilitiesGrid;
