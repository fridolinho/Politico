import bcrypt from 'bcrypt';
import _ from 'underscore';
import jwt from 'jsonwebtoken';
import Users from '../models/user';
import { validateUser } from '../helpers/validations';

class User {
  static async register(req, res) {
    const error = validateUser(req.body, req.url);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const user = await Users.checkEmail(req.body.email);
    if (user.length !== 0) {
      return res.status(409).send({
        status: 409,
        error: `${user[0].email} has been taken`,
      });
    }

    const addedUser = await Users.addUser(req.body);
    const newUser = _.omit(addedUser, 'password');
    const token = jwt.sign({ newUser }, process.env.PRIVATE_KEY, { expiresIn: 360 });
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        user: newUser[0],
      }],
    });
  }

  static async login(req, res) {
    const error = validateUser(req.body, req.url);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const user = await Users.checkEmail(req.body.email);
    if (user.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'Wrong email or password',
      });
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (validPassword) {
      const newUser = _.omit(user, 'password');
      const token = jwt.sign({ newUser }, process.env.PRIVATE_KEY, { expiresIn: 1800 });
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user: newUser,
        }],
      });
    }

    return res.status(404).send({
      status: 404,
      error: 'Wrong email or password',
    });
  }

  static async reset(req, res) {
    const user = await Users.checkEmail(req.body.email);
    if (user.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'Wrong email or password',
      });
    }
    Users.sendResetEmail(req.body.email);

  }
}

export default User;
