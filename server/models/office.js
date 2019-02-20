import pool from './connect';

class Offices {
  async createOffice(data) {
    this.res = await pool.query('INSERT INTO office (type, name) VALUES($1, $2) RETURNING *', [data.type, data.name]);
    return [this.res.rows[0]];
  }

  async getAllOffices() {
    this.res = await pool.query('SELECT * FROM office');
    return this.res.rows;
  }

  async getSpecificOffice(id) {
    this.result = [];
    const res = await pool.query('SELECT * FROM office WHERE id = $1', [id]);
    if (res.rowCount === 1) {
      this.result.push(res.rows[0]);
    }
    return this.result;
  }

  async checkOffice(name) {
    this.res = await pool.query('SELECT * FROM office WHERE name = $1', [name]);
    if (this.res.rowCount > 0) {
      this.result = [this.res.rows[0]];
    }
    return this.result;
  }

  async checkCandidate(candidate) {
    this.res = await pool.query('SELECT * FROM candidate WHERE candidate = $1', [candidate]);
    if (this.res.rowCount > 0) {
      this.candidate = [this.res.rows[0]];
    }
    return this.candidate;
  }

  async addCandidate(data, id) {
    this.candidate = [
      id,
      data.party,
      data.candidate,
    ];
    this.res = await pool.query('INSERT INTO candidate (office, party, candidate) VALUES ($1, $2, $3) RETURNING *', this.candidate);
    return [this.res.rows[0]];
  }
  
}
export default new Offices();
