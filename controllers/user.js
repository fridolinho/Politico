import users from "../models/user";
import Joi from 'joi';
const JoiPhone = Joi.extend(require('joi-phone-number'));

class User {

	// User registration

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

		const user = [];
		const email = req.body.email;
		for(let i = 0; i < users.length; i ++){
			if(users[i].email == email){
				user.push(users[i]);
			}
		}

		if (user.length != 0) return res.status(400).send({
			status: 400,
			message: "email taken"
		})
		
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

	// User login

	static async login(req, res) {
		const schema = {
			email: Joi.string().email().required().trim(),
			password: Joi.string().min(4).required().trim()
		}

		const {error} = Joi.validate(req.body, schema);

		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});
		
		const email = req.body.email;
		const password = req.body.password;
		const user = [];
		for(let i = 0; i < users.length; i ++){
			if(users[i].email == email){
				user.push(users[i]);
			}
		}

		if(user.length === 1){
			if(user[0].password == password){
				res.status(200).send({
					status: 200,
					message: "you are logged in"
				});
			}   else{
				res.status(400).send({
					status: 400,
					error: "Wrong Password"
				})
			} 
			
		} else {
			res.status(404).send({
				status: 400,
				error: "email not registered"
			})
		}
		
		

	}
}

export default User;