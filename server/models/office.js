import pool from './connect';

class Offices {
  async createOffice(data) {
    this.office = [];
    this.res = await pool.query('INSERT INTO office (type, name) VALUES($1, $2) RETURNING *', [data.type, data.name]);
    this.office.push(this.res.rows[0]);
    return this.office;
  }

  getAllOffices() {
    return this.offices;
  }

  getSpecificOffice(id) {
    const newId = parseInt(id, 10);
    const result = this.offices.find(x => x.id === newId);
    return result;
  }

  async checkOffice(name) {
    this.office = [];
    this.res = await pool.query('SELECT * FROM office WHERE name = $1', [name]);
    if (this.res.rowCount > 0) {
      this.office.push(this.res.rows[0]);
    }
    return this.office;
  }
}
export default new Offices();
