class Parties {
  constructor() {
    this.parties = [];
  }

  createParty(data) {
    const newParty = {
      id: this.parties.length + 1,
      name: data.name,
      hqAddress: data.hqAddress,
      logoUrl: data.logoUrl,
    };
    this.parties.push(newParty);
    return newParty;
  }

  getAllParties() {
    return this.parties;
  }

  getSpecificParty(id) {
    const result = this.parties.find(x => x.id == id);
    return result;
  }

  deleteParty(id) {
    const i = this.parties.findIndex(x => x.id == id);
    this.parties.splice(i, 1);
  }

  updateParty(id, data) {
    const party = this.parties.find(x => x.id == id);
    if (data.name) party.name = data.name;
    if (data.hqAddress) party.hqAddress = data.hqAddress;
    if (data.logoUrl) party.logoUrl = data.logoUrl;
  }

  checkParty(data) {
    const party = this.parties.find(x => x.name == data.name || x.logoUrl == data.logoUrl);
    return party;
  }
}
export default new Parties();
