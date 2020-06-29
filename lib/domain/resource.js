class Resource {
  constructor({ id, name, description, websites = [], address, tags = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.websites = websites;
    this.address = address;
    this.tags = tags;
  }
}

export default Resource;
