export default class FindResources {
  constructor({ resourcesGateway }) {
    this.resourcesGateway = resourcesGateway;
  }

  async execute() {
    return await this.resourcesGateway.all();
  }
}
