import bcrypt from 'bcrypt';
import pool from './connect';

class Users {
  async checkEmail(email) {
    this.user = [];
    this.res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (this.res.rowCount > 0) {
      this.user.push(this.res.rows[0]);
    }
    return this.user;
  }

  async addUser(data) {
    this.salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(data.password, this.salt);
    this.newUser = [
      data.firstName,
      data.lastName,
      data.otherName,
      data.email,
      data.phoneNumber,
      this.password,
      data.passportUrl,
    ];
    pool.query(`INSERT INTO
      users(
      "firstName",
      "lastName",
      "otherName",
      email,
      "phoneNumber",
      password,
      "passportUrl"
      )
      VALUES($1, $2, $3, $4, $5, $6, $7)
    `, this.newUser);
  }
}

export default new Users();
