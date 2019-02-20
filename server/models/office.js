import pool from './connect';

class Offices {
  async createOffice(data) {
    this.office = [];
    this.res = await pool.query('INSERT INTO office (type, name) VALUES($1, $2) RETURNING *', [data.type, data.name]);
    this.office.push(this.res.rows[0]);
    return this.office;
  }

  async getAllOffices() {
    this.offices = [];
    this.res = await pool.query('SELECT * FROM office');
    this.offices.push(this.res.rows);
    return this.offices;
  }

  async getSpecificOffice(id) {
    this.office = [];
    this.res = await pool.query('SELECT * FROM office WHERE id = $1', [id]);
    if (this.res.rowCount === 1) {
      this.office.push(this.res.rows[0]);      
    }
    return this.office;
  }

  async checkOffice(name) {
    this.office = [];
    this.res = await pool.query('SELECT * FROM office WHERE name = $1', [name]);
    if (this.res.rowCount > 0) {
      this.office.push(this.res.rows[0]);
    }
    return this.office;
  }

  async checkCandidate(candidate) {
    this.candidate = [];
    this.res = await pool.query('SELECT * FROM candidate WHERE candidate = $1', [candidate]);
    if (this.res.rowCount > 0) {
      this.candidate.push(this.res.rows[0]);
    }
    return this.candidate;
  }

  async addCandidate(data, id) {
    this.results = [];
    this.candidate = [
      id,
      data.party,
      data.candidate,
    ];
    this.res = await pool.query('INSERT INTO candidate (office, party, candidate) VALUES ($1, $2, $3) RETURNING *', this.candidate);
    this.results.push(this.res.rows[0]);
    return this.results;
  }
}
export default new Offices();
