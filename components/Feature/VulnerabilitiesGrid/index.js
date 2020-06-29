import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxList,
  TextInput
} from 'components/Form';
import groups from './grid.json';

const VulnerabilitiesGrid = ({ onUpdate }) => {
  const [grid, setGrid] = useState({ assets: {}, vulnerabilities: {} });

  const addItem = (obj, key, value) => {
    obj[key] = value;
    return obj;
  };

  const removeItem = (obj, key) => {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => k != key));
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

    updateGrid(
      Object.assign({}, grid, {
        assets: newAssets
      })
    );
  };

  const updateVulnerabilities = (key, value, isTextInput) => {
    let newVulns;

    if (isTextInput) {
      newVulns = value
        ? addItem(grid.vulnerabilities, key, value)
        : removeItem(grid.vulnerabilities, key);
    } else {
      newVulns = grid.vulnerabilities[key]
        ? removeItem(grid.vulnerabilities, key)
        : addItem(grid.vulnerabilities, key, value);
    }

    updateGrid(
      Object.assign({}, grid, {
        vulnerabilities: newVulns
      })
    );
  };

  const updateGrid = newGrid => {
    setGrid(newGrid);
    onUpdate({
      assets: Object.values(newGrid.assets).filter(a => a !== 'Other'),
      vulnerabilities: Object.values(newGrid.vulnerabilities).filter(
        v => v !== 'Other'
      )
    });
  };

  const labelToId = label => label.replace(' ', '-').toLowerCase();

  return (
    <Accordion title="Things to explore with the resident">
      {groups.map(({ id, name, assets, vulnerabilities }) => (
        <AccordionItem key={id} id={id} heading={name}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="vulnerability">
                {vulnerabilities.map(({ label, textinputs }) => {
                  const cbId = `${id}-v-${labelToId(label)}`;
                  return (
                    <React.Fragment key={cbId}>
                      <Checkbox
                        label={label}
                        name={cbId}
                        onClick={() =>
                          updateVulnerabilities(cbId, label, false)
                        }
                      />
                      {textinputs &&
                        grid.vulnerabilities[cbId] &&
                        textinputs.map(({ label }) => {
                          const inputId = `${cbId}-${labelToId(label)}-i`;
                          return (
                            <TextInput
                              name={inputId}
                              key={inputId}
                              label={label}
                              onChange={val =>
                                updateVulnerabilities(inputId, val, true)
                              }
                            />
                          );
                        })}
                    </React.Fragment>
                  );
                })}
              </CheckboxList>
            </div>
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="asset">
                {assets.map(({ label, textinputs }) => {
                  const cbId = `${id}-a-${labelToId(label)}`;
                  return (
                    <React.Fragment key={cbId}>
                      <Checkbox
                        key={cbId}
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
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default VulnerabilitiesGrid;
