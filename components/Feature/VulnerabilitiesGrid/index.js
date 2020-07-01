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
    obj[key] = { name: value, data: {} };
    return obj;
  };

  const addTextItem = (obj, value, cbId, label) => {
    obj[cbId] = {
      ...obj[cbId],
      data: {
        ...obj[cbId].data,
        [label]: value
      }
    };
    return obj;
  };

  const removeItem = (obj, key) => {
    return Object.fromEntries(Object.entries(obj).filter(([k]) => k != key));
  };

  const removeTextItem = (obj, cbId, label) => {
    delete obj[cbId].data[label];
    return obj;
  };

  const updateAssets = (key, value, isTextInput, cbId, label) => {
    let newAssets;

    if (isTextInput) {
      newAssets = value
        ? addTextItem(grid.assets, value, cbId, label)
        : removeTextItem(grid.assets, cbId);
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

  const updateVulnerabilities = (key, value, isTextInput, cbId, label) => {
    let newVulns;
    console.log({ value });
    if (isTextInput) {
      newVulns = value
        ? addTextItem(grid.vulnerabilities, value, cbId, label)
        : removeTextItem(grid.vulnerabilities, cbId);
    } else {
      newVulns = grid.vulnerabilities[key]
        ? removeItem(grid.vulnerabilities, key)
        : addItem(grid.vulnerabilities, key, value, label);
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

  const labelToId = label =>
    label
      .replace(/ /g, '-')
      .replace(/\//g, '-')
      .toLowerCase();

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
                                updateVulnerabilities(
                                  inputId,
                                  val,
                                  true,
                                  cbId,
                                  label
                                )
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
                              onChange={val =>
                                updateAssets(inputId, val, true, cbId, label)
                              }
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
