class Resource {
  constructor({ id, name, description, websites = [], address, postcode, tags = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.websites = websites;
    this.address = address;
    this.postcode = postcode;
    this.tags = tags;
  }
}

export default Resource;
