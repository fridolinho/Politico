import Joi from 'joi';

const JoiPhone = Joi.extend(require('joi-phone-number'));

export const validateUser = (data, url) => {
  let schema = {
    firstName: Joi.string().min(5).required().trim(),
    lastName: Joi.string().min(5).required().trim(),
    otherName: Joi.string().min(5).trim(),
    email: Joi.string().email().required().trim(),
    phoneNumber: JoiPhone.string().phoneNumber().min(10).required()
      .trim(),
    password: Joi.string().min(4).required().trim(),
    passportUrl: Joi.string().min(5).required().trim(),
  };

  if (url === '/login') {
    schema = {
      email: Joi.string().email().required().trim(),
      password: Joi.string().min(4).required().trim(),
    };
  }

  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateOffice = (data) => {
  const schema = {
    type: Joi.string().trim().min(5).required(),
    name: Joi.string().min(5).required(),
  };

  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateParty = (data, method) => {
  let schema = {
    name: Joi.string().trim().min(3).required(),
    hqAddress: Joi.string().trim().min(5).required(),
    logoUrl: Joi.string().trim().min(5).required(),
  };

  if (method === 'PATCH') {
    schema = {
      name: Joi.string().trim().min(3),
      hqAddress: Joi.string().trim().min(5),
      logoUrl: Joi.string().trim().min(5),
    };
  }

  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateCandidate = (data) => {
  const schema = {
    party: Joi.number().integer().required(),
    user: Joi.number().integer().required(),
  };

  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateVote = (data) => {
  const schema = {
    office: Joi.number().integer().required(),
    candidate: Joi.number().integer().required(),
    createdBy: Joi.number().integer().required(),
  };

  const { error } = Joi.validate(data, schema);
  return error;
};

export const validatePetition = (data) => {
  const schema = {
    createdBy: Joi.number().integer().required(),
    office: Joi.number().integer().required(),
    body: Joi.string().required().trim(),
  };

  const { error } = Joi.validate(data, schema);
  return error;
};
