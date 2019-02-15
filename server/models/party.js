class Parties {
  constructor() {
    this.parties = [];
  }

  createParty(data) {
    const newParty = {
      id: this.parties.length + 1,
      name: data.name.toLowerCase(),
      hqAddress: data.hqAddress.toLowerCase(),
      logoUrl: data.logoUrl.toLowerCase(),
    };
    this.parties.push(newParty);
    return newParty;
  }

  getAllParties() {
    return this.parties;
  }

  getSpecificParty(id) {
    const newId = parseInt(id, 10);
    const result = this.parties.find(x => x.id === newId);
    return result;
  }

  deleteParty(id) {
    const newId = parseInt(id, 10);
    const i = this.parties.findIndex(x => x.id === newId);
    this.parties.splice(i, 1);
  }

  updateParty(id, data) {
    const newId = parseInt(id, 10);
    const party = this.parties.find(x => x.id === newId);
    if (data.name) party.name = data.name.toLowerCase();
    if (data.hqAddress) party.hqAddress = data.hqAddress.toLowerCase();
    if (data.logoUrl) party.logoUrl = data.logoUrl.toLowerCase();
  }

  checkParty(data) {
    const newName = data.name.toLowerCase();
    const party = this.parties.find(x => x.name === newName);
    return party;
  }
}
export default new Parties();
