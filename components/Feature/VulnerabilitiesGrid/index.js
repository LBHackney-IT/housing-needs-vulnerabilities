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

  const updateAssets = (id, text) => {
    grid.assets[id] ? delete grid.assets[id] : (grid.assets[id] = text);
    updateGrid(grid);
  };

  const updateVulnerabilities = (id, text) => {
    grid.vulnerabilities[id]
      ? delete grid.vulnerabilities[id]
      : (grid.vulnerabilities[id] = text);
    updateGrid(grid);
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
                {vulnerabilities.map(({ text }, j) => (
                  <Checkbox
                    key={`${id}-v-${j}`}
                    label={text}
                    name={`${id}-v-${j}`}
                    onClick={() => updateVulnerabilities(`${id}-v-${j}`, text)}
                  />
                ))}
              </CheckboxList>
            </div>
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="asset">
                {assets.map(({ text }, j) => (
                  <Checkbox
                    key={`${id}-a-${j}`}
                    label={text}
                    name={`${id}-a-${j}`}
                    onClick={() => updateAssets(`${id}-a-${j}`, text)}
                  />
                ))}
              </CheckboxList>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default VulnerabilitiesGrid;
