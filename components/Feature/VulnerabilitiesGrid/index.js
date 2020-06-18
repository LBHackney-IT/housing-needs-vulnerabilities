import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxList
} from 'components/Form';

const VulnerabilitiesGrid = () => {
  const groups = [
    {
      id: 'group1',
      name: 'this is a group',
      assets: [{ text: 'a1' }],
      vulnerabilities: [{ text: 'v1' }, { text: 'v2' }]
    },
    {
      id: 'group2',
      name: 'this is another group',
      assets: [{ text: 'a1' }],
      vulnerabilities: [{ text: 'v1' }, { text: 'v2' }]
    }
  ];

  return (
    <Accordion>
      {groups.map(({ id, name, assets, vulnerabilities }, i) => (
        <AccordionItem key={`${id}-${i}`} id={`${id}-${i}`} heading={name}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="vulnerability">
                {vulnerabilities.map((v, j) => (
                  <Checkbox
                    key={`${id}-v-${j}`}
                    label={v.text}
                    name={`${id}-v-${j}`}
                  />
                ))}
              </CheckboxList>
            </div>
            <div className="govuk-grid-column-one-half">
              <CheckboxList className="asset">
                {assets.map((a, j) => (
                  <Checkbox
                    key={`${id}-a-${j}`}
                    label={a.text}
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
