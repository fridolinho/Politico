import pool from './connect';

class Parties {
  async createParty(data) {
    this.newParty = [
      data.name,
      data.hqAddress,
      data.logoUrl,
    ];

    this.party = [];
    this.res = await pool.query('INSERT INTO party (name, "hqAddress", "logoUrl") VALUES($1, $2, $3) RETURNING *', this.newParty);
    this.party.push(this.res.rows[0]);
    return this.party;
  }

  async getAllParties() {
    this.parties = [];
    this.res = await pool.query('SELECT * FROM party');
    this.parties.push(this.res.rows);
    return this.parties;
  }

  async getSpecificParty(id) {
    this.party = [];
    this.res = await pool.query('SELECT * FROM party WHERE id = $1', [id]);
    if (this.res.rowCount === 1) {
      this.party.push(this.res.rows[0]);
    }
    return this.party;
  }

  async deleteParty(id) {
    this.newId = parseInt(id, 10);
    await pool.query('DELETE FROM party WHERE id = $1', [this.newId]);
  }

  updateParty(id, data, party) {
    const newName = data.name || party.name;
    const newHqAddress = data.hqAddress || party.hqAddress;
    const newLogoUrl = data.logoUrl || party.logoUrl;
    this.newId = parseInt(id, 10);
    this.newData = [
      newName,
      newHqAddress,
      newLogoUrl,
      this.newId,
    ];
    console.log(this.newData);
    pool.query('UPDATE party SET name = $1, "hqAddress" = $2, "logoUrl" = $3 WHERE id =$4', this.newData);
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
