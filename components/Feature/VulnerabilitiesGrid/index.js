import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxList
} from 'components/Form';
import groups from './grid.json';

const VulnerabilitiesGrid = () => {
  return (
    <Accordion>
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
