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

  const updateAssets = (id, text) => {
    updateGrid(
      Object.assign({}, grid, {
        assets: grid.assets[id]
          ? removeItem(grid.assets, id)
          : addItem(grid.assets, id, text)
      })
    );
  };

  const updateVulnerabilities = (id, text) => {
    updateGrid(
      Object.assign({}, grid, {
        vulnerabilities: grid.vulnerabilities[id]
          ? removeItem(grid.vulnerabilities, id)
          : addItem(grid.vulnerabilities, id, text)
      })
    );
  };

  const updateGrid = newGrid => {
    setGrid(newGrid);
    onUpdate({
      assets: Object.values(newGrid.assets),
      vulnerabilities: Object.values(newGrid.vulnerabilities)
    });
  };

  return (
    <Accordion title="Things to explore with the resident">
      {groups.map(({ id, name, assets, vulnerabilities }, i) => (
        <AccordionItem key={`${id}-${i}`} id={`${id}-${i}`} heading={name}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="vulnerability">
                {vulnerabilities.map(({ label, textinputs }, j) => {
                  const cbId = `${id}-v-${j}`;
                  return (
                    <React.Fragment key={cbId}>
                      <Checkbox
                        label={label}
                        name={cbId}
                        onClick={() => updateVulnerabilities(cbId, label)}
                      />
                      {textinputs &&
                        grid.vulnerabilities[cbId] &&
                        textinputs.map(({ label }, k) => {
                          return (
                            <TextInput
                              key={`${cbId}-${k}`}
                              label={label}
                              onChange={val =>
                                updateVulnerabilities(`${cbId}-${k}`, val)
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
                {assets.map(({ label, textinputs }, j) => {
                  const cbId = `${id}-a-${j}`;
                  return (
                    <React.Fragment key={cbId}>
                      <Checkbox
                        key={cbId}
                        label={label}
                        name={cbId}
                        onClick={() => updateAssets(cbId, label)}
                      />
                      {textinputs &&
                        grid.assets[cbId] &&
                        textinputs.map(({ label }, k) => (
                          <TextInput
                            key={`${cbId}-${k}`}
                            label={label}
                            onChange={val => updateAssets(`${cbId}-${k}`, val)}
                          />
                        ))}
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
