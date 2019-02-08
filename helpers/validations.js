import Joi from 'joi';

const validateOffice = (office) => {
	const schema = {
		type: Joi.string().min(5).required().trim(),
		name: Joi.string().min(5).required().trim()
	}
		const {error} = Joi.validate(req.body, schema);
		
		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});
}