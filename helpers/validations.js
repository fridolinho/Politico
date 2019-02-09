import Joi from 'joi';

export const validateOffice = (data) => {
	const schema = {
		type: Joi.string().trim().min(5).required(),
		name: Joi.string().min(5).required()
	};

    const { error } = Joi.validate(data, schema); 
    return error;
	
};




