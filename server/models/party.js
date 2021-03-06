import pool from './connect';

class Parties {
  async createParty(data) {
    this.newParty = [
      data.name.trim(),
      data.hqAddress.trim(),
      data.logoUrl.trim(),
    ];

    this.res = await pool.query('INSERT INTO party (name, "hqAddress", "logoUrl") VALUES($1, $2, $3) RETURNING *', this.newParty);
    return [this.res.rows[0]];
  }

  async getAllParties() {
    this.res = await pool.query('SELECT * FROM party');
    return this.res.rows;
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

  async updateParty(id, data, party) {
    const newName = data.name || party[0].name;
    const newHqAddress = data.hqAddress || party[0].hqAddress;
    const newLogoUrl = data.logoUrl || party[0].logoUrl;
    this.newId = parseInt(id, 10);
    this.newData = [
      newName.trim(),
      newHqAddress.trim(),
      newLogoUrl.trim(),
      this.newId,
    ];
    this.res = await pool.query('UPDATE party SET name = $1, "hqAddress" = $2, "logoUrl" = $3 WHERE id = $4 RETURNING *', this.newData);
    return [this.res.rows[0]];
  }

  async checkParty(name) {
    this.party = [];
    const res = await pool.query('SELECT * FROM party WHERE name = $1', [name.trim()]);
    if (res.rowCount > 0) {
      this.party.push(res.rows[0]);
    }
    return this.party;
  }
}
export default new Parties();
