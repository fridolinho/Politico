import Parties from "../models/party";
import { validateParty } from '../helpers/validations';
class Party {

	// create a new political party

	static async create(req, res){

		const error = validateParty(req.body);

		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});

		const party = Parties.checkParty(req.body);
		if(party) return   res.status(409).send({
								status: 409,
								error: "party name or logoUrl exist already"
							});
		
		const newParty = Parties.createParty(req.body);
		res.status(201).send({
			status: 201,
			data: newParty
		});
	}
	
	//get all political parties

	static async getAll(req, res){
		const parties = Parties.getAllParties();
		
		res.status(200).send({
			status: 200,
			data: parties
		});
	}

	// Fetch a specific political party record

	static async getOne(req, res){
	const party = Parties.getSpecificParty(req.params.id);
	if(!party) return res.status(404).send({
										status: 404,
										error: "political party not found"
									});
	res.status(200).send({
		status: 200,
		data: party
	})	
	}

	// Update a specific political party

	static async update(req, res){			
		const error = validateParty(req.body, req.method);
		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});
		const result = Parties.getSpecificParty(req.params.id);

		if(result){
			const part = Parties.updateParty(req.params.id, req.body);
			return res.status(200).send({
				status: 200,
				data: result
			});
		} res.status(404).send({
			status: 404,
			error: "political party not found"
		});
		 		
	}

	// delete a particular political party

	static async remove(req, res){
		const result = Parties.getSpecificParty(req.params.id);

		if(result){
			const part = Parties.deleteParty(req.params.id)
			return res.status(200).send({
						status: 200,
						message: "Political party deleted"
					});
		} res.status(404).send({
			status: 404,
			error: "political party not found"
		});

				
	
	}

}

export default Party;