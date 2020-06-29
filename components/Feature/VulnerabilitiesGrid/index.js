import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxList
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
        <AccordionItem
          key={`${id}-${i}`}
          id={`${id}-${i}`}
          heading={name}
          datatestid="accordion-item"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="vulnerability">
                {vulnerabilities.map(({ text }, j) => {
                  return (
                    <Checkbox
                      key={`${id}-v-${j}`}
                      label={text}
                      name={`${id}-v-${j}`}
                      onClick={() =>
                        updateVulnerabilities(`${id}-v-${j}`, text)
                      }
                    />
                  );
                })}
              </CheckboxList>
            </div>
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="asset">
                {assets.map(({ text }, j) => {
                  return (
                    <Checkbox
                      key={`${id}-a-${j}`}
                      label={text}
                      name={`${id}-a-${j}`}
                      onClick={() => updateAssets(`${id}-a-${j}`, text)}
                    />
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
