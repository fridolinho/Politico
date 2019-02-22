import bcrypt from 'bcrypt';
import mailer from 'nodemailer';
import jwt from 'jsonwebtoken';
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
    return [this.res.rows[0]];
  }

  async sendResetEmail(req, res) {
    const email = req.body.email;
    const token = await jwt.sign({ email }, process.env.PRIVATE_KEY, { expiresIn: '24h' });
    const transporter = await mailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fridolinho@gmail.com',
        pass: 'Rwagasore@89',
      },
    });

    const mailerOptions = {
      from: 'admin_@politico.com',
      to: email,
      subject: 'Politico-fr password reset',
      html: `
      <p>User this link to reset your password <a href='https://politico-api-service.herokuapp.com/api/v1/auth/${token}'>Reset link</a> </p>
    `,
    };

    // Sending the email
    await transporter.sendMail(mailerOptions, (error) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'An error has occured while sending the reset password link',
        });
      }
    });
  }
}

export default new Users();
