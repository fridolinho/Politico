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
	
	//get all political parties

	static async getAll(req, res){
		const count = parties.length;
		if(count === 0)	return res.status(404).send({
									status: 404,
									error: 'No political party found'
								});
		
		res.status(200).send({
			status: 200,
			data: parties
		});
	}

	
}

export default Party;