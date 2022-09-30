const Joi = require("joi");

const ProjectPayloadSchema = Joi.object({
  name: Joi.string().required(),
  image_link: Joi.string().required(),
  description: Joi.string().required(),
  github_link: Joi.string().required(),
  demo_link: Joi.string().required(),
});

module.exports = { ProjectPayloadSchema };
