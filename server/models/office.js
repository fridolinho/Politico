class Offices {
  constructor() {
    this.offices = [];
  }

  createOffice(data) {
    const newOffice = {
      id: this.offices.length + 1,
      type: data.type.toLowerCase(),
      name: data.name.toLowerCase(),
    };
    this.offices.push(newOffice);
    return newOffice;
  }

  getAllOffices() {
    return this.offices;
  }

  getSpecificOffice(id) {
    const newId = parseInt(id, 10);
    const result = this.offices.find(x => x.id === newId);
    return result;
  }

  checkOffice(name) {
    const newName = name.toLowerCase();
    const office = this.offices.find(x => x.name === newName);
    return office;
  }
}
export default new Offices();
