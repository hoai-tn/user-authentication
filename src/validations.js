// Validation
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = schema;