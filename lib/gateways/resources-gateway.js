import Airtable from 'airtable';
import { createResourceFromModel } from './models/createResourceFromModel';

class ResourcesGateway {
  constructor({ apiKey, baseId, tableNames }) {
    this.tableNames = tableNames;
    this.tables = new Airtable({ apiKey }).base(baseId);
  }

  async all() {
    const results = await Promise.all(
      this.tableNames.map(table => {
        return this.tables(table)
          .select()
          .all();
      })
    );

    return results.flat().map(createResourceFromModel);
  }
}

export default ResourcesGateway;
