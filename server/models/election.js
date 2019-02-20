import pool from './connect';

class Elections {
  async addCandidate(data, id) {
    this.candidate = [
      id,
      data.party,
      data.candidate,
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
      data.voter,
    ];
    const result = [];
    this.res = await pool.query('INSERT INTO vote (office, candidate, "createdBy") VALUES ($1, $2, $3) RETURNING *', this.candidate);
    result.push(this.res.rows[0]);
    return result;
  }

  async checkVote(data) {
    this.vote = [
      data.office,
      data.voter,
    ];
    const result = [];
    this.res = await pool.query('SELECT * FROM vote WHERE office = $1 AND "createdBy" = $2', this.vote);
    if (this.res.rowCount !== 0) result.push(this.res.rows[0]);
    return result;
  }
}

export default new Elections();
