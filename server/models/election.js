import pool from './connect';

class Elections {
  async addCandidate(data, id) {
    this.candidate = [
      id,
      data.party,
      data.user,
    ];
    this.res = await pool.query('INSERT INTO candidate (office, party, candidate) VALUES ($1, $2, $3) RETURNING *', this.candidate);
    return [this.res.rows[0]];
  }

  updateCandidate(id) {
    pool.query('UPDATE candidate SET votes = votes+1 WHERE candidate = $1', [id]);
  }

  async registerVote(data) {
    this.candidate = [
      data.office,
      data.candidate,
      data.createdBy,
    ];
    const result = [];
    this.res = await pool.query('INSERT INTO vote (office, candidate, "createdBy") VALUES ($1, $2, $3) RETURNING *', this.candidate);
    result.push(this.res.rows[0]);
    return result;
  }

  async checkVote(data) {
    this.vote = [
      data.office,
      data.createdBy,
    ];
    const result = [];
    this.res = await pool.query('SELECT * FROM vote WHERE office = $1 AND "createdBy" = $2', this.vote);
    if (this.res.rowCount !== 0) result.push(this.res.rows[0]);
    return result;
  }

  async getResults(id) {
    this.id = id;

    const res = await pool.query('SELECT * FROM candidate WHERE office = $1 ORDER BY votes DESC', [this.id]);
    return res.rows;
  }

  async registerPetition(data) {
    this.petition = [
      data.createdBy,
      data.office,
      data.body,
    ];
    const result = await pool.query('INSERT INTO petition ("createdBy", office, body) VALUES ($1, $2, $3) RETURNING *', this.petition);
    return result.rows;
  }

  async checkPetition(data) {
    this.petition = [
      data.body,
      data.office,
    ];
    const result = [];
    this.res = await pool.query('SELECT * FROM petition WHERE body = $1 AND "office" = $2', this.petition);
    if (this.res.rowCount !== 0) result.push(this.res.rows[0]);
    return result;
  }
}

export default new Elections();
