import bcrypt from 'bcrypt';
import mailer from 'node-mailer';
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

  async getSpecificUser(id) {
    this.user = [];
    this.res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (this.res.rowCount > 0) {
      this.user.push(this.res.rows[0]);
    }
    return this.user;
  }

  async addUser(data) {
    this.salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(data.password, this.salt);
    this.newUser = [
      data.firstName.trim(),
      data.lastName.trim(),
      data.otherName,
      data.email.trim(),
      data.phoneNumber.trim(),
      this.password.trim(),
      data.passportUrl.trim(),
    ];
    this.user = [];
    this.res = await pool.query(`INSERT INTO
      users(
      "firstName",
      "lastName",
      "otherName",
      email,
      "phoneNumber",
      password,
      "passportUrl"
      )
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `, this.newUser);
    this.user.push(this.res.rows[0]);
    return this.user;
  }

  async sendResetEmail(email) {
    this.email = email;
    mailer.Mail({
      from: 'fridolinho@gmail.com',
      to: this.email,
      subject: 'Political app password Reset',
      body: 'My body',
      callback: function(err, data){
        console.log(err);
        console.log(data);
      }
    });
  }
}

export default new Users();
