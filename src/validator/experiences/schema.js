const Joi = require("joi");

const ExperiencePayloadSchema = Joi.object({
  period: Joi.string().required(),
  position: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = { ExperiencePayloadSchema };
