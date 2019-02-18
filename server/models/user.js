import bcrypt from 'bcrypt';
import pool from './connect';

class Users {
  constructor() {
    pool.query('SELECT * FROM users', (error, response) => {
      this.users = response.rows;
    });
  }

  checkEmail(email) {
    const currentUser = this.users.find(user => user.email === email);
    return currentUser;
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
    this.users.push(data);
  }
}

export default new Users();
