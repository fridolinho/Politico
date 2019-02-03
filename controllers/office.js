import offices from "../models/office";
import Joi from 'joi';

class Office {

	// create a political office

	static async create(req, res) {
		const schema = {
			type: Joi.string().min(5).required().trim(),
			name: Joi.string().min(5).required().trim()
		}

		const {error} = Joi.validate(req.body, schema);

		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});
		
		const newOffice = {
			id: offices.length + 1,
			type: req.body.type,
			name: req.body.name
		}

		offices.push(newOffice);
		
		res.status(201).send({
			status: 201,
			data: newOffice
		});

	}
}

export default Office;