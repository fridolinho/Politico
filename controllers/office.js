import offices from "../models/office";
import Joi from 'joi';

class Office {

	// create a political office

	static async createOffice(req, res) {
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

	//get all political offices

	static async getAllOffices(req, res){
		const count = offices.length;
		if(count === 0)	return res.status(404).send({
									status: 404,
									error: 'No political office found'
								});
		
		res.status(200).send({
			status: 200,
			data: offices
		});
	}

	// get specific political office

	static async getOneOffice(req, res){
		const office_id = parseInt(req.params.id);
		const result = [];
		for(let i = 0; i < offices.length; i ++){
			if(offices[i].id == office_id){
				result.push(offices[i]);
			}
		}
	if(result.length == 0) return res.status(404).send({
										status: 404,
										error: "political office not found"
									});
	res.status(200).send({
			status: 200,
			data: result
		})
	}
}

export default Office;