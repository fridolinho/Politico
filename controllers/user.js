import users from "../models/user";
import Joi from 'joi';
const JoiPhone = Joi.extend(require('joi-phone-number'));

class User {

	// create a political office

	static async register(req, res) {
		const schema = {
			firstname: Joi.string().min(5).required().trim(),
			lastname: Joi.string().min(5).required().trim(),
			othername: Joi.string().min(5).trim(),
			email: Joi.string().email().required().trim(),
			phonenumber: JoiPhone.string().phoneNumber().min(10).required().trim(),			
			password: Joi.string().min(4).required().trim(),
			passporturl: Joi.string().min(5).required().trim()
		}

		const {error} = Joi.validate(req.body, schema);

		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});
		
		const newUser = {
			id: users.length + 1,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			othername: req.body.othername,
			email: req.body.email,
			phonenumber: req.body.phonenumber,
			password: req.body.password,
			passporturl: req.body.passporturl,
			isadmin: false
		}

		users.push(newUser);
		
		res.status(201).send({
			status: 201,
			data: newUser
		});

	}
}

export default User;