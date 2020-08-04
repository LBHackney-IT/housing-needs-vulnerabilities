class Resource {
  constructor({ id, name, description, websites = [], address, postcode, tags = [], telephone, coordinates }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.websites = websites;
    this.address = address;
    this.postcode = postcode;
    this.tags = tags;
    this.telephone = telephone;
    this.coordinates = coordinates;
  }
}

export default Resource;
