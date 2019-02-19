import pool from './connect';

class Parties {
  async createParty(data) {
    this.newParty = [
      data.name,
      data.hqAddress,
      data.logoUrl,
    ];

    this.party = [];
    this.res = await pool.query('INSERT INTO party (name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *', this.newParty);
    this.party.push(this.res.rows[0]);
    return this.party;
  }

  async getAllParties() {
    this.parties = [];
    this.res = await pool.query('SELECT * FROM party');
    this.parties.push(this.res.rows);
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
    if (data.name) party.name = data.name;
    if (data.hqAddress) party.hqAddress = data.hqAddress;
    if (data.logoUrl) party.logoUrl = data.logoUrl;
  }

  async checkParty(name) {
    this.party = [];
    this.res = await pool.query('SELECT * FROM party WHERE name = $1', [name]);
    if (this.res.rowCount > 0) {
      this.party.push(this.res.rows[0]);
    }
    return this.party;
  }
}
export default new Parties();
