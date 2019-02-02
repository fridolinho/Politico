import parties from "../models/party";
import Joi from 'joi';
class Party {

	// create a new political party

	static async create(req, res){

		const schema = {
			name: Joi.string().min(3).required().trim(),
			hqaddress: Joi.string().min(3).required().trim(),
			logourl: Joi.string().min(3).required().trim()
		}

		const {error} = Joi.validate(req.body, schema);

		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});
		
		const newParty = {
			id: parties.length + 1,
			name: req.body.name,
			hqaddress: req.body.hqaddress,
			logourl: req.body.logourl
		}

		parties.push(newParty);
		
		res.status(201).send({
			status: 201,
			data: newParty
		});
	}

}

export default Party;