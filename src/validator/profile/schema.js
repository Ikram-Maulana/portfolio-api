const Joi = require("joi");

const ProfilePayloadSchema = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().required(),
  interest: Joi.array().items(Joi.string()).required(),
  weapon: Joi.array().items(Joi.string()).required(),
});

module.exports = { ProfilePayloadSchema };
