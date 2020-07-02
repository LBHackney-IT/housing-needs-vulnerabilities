import Resource from 'lib/domain/resource';

// .filter() will ignore null or undefined values
const filterEmptyValues = item => item;

export function createResourceFromModel({ id, fields }) {
  const websites = [fields['Website 1'], fields['Website 2']].filter(
    filterEmptyValues
  );

  return new Resource({
    id: id,
    name: fields.Name,
    description: fields.Description,
    websites,
    address: fields.Address,
    tags: fields['Vulnerability snapshot tags']
  });
}
