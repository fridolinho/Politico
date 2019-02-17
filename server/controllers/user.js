import _ from 'underscore';
import jwt from 'jsonwebtoken';
import Users from '../models/user';
import { validateUser } from '../helpers/validations';

class User {
  static async register(req, res) {
    const error = validateUser(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const user = Users.checkEmail(req.body.email);
    if (user) {
      return res.status(409).send({
        status: 409,
        error: `${user.email} has been taken`,
      });
    }

    Users.addUser(req.body);
    const newUser = _.omit(req.body, 'password');
    const token = jwt.sign({ newUser }, process.env.PRIVATE_KEY, { expiresIn: 360 });
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        user: newUser,
      }],
    });
  }
}

export default User;
