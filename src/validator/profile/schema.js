const Joi = require("joi");

const ProfilePayloadSchema = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().required(),
  description: Joi.string().required(),
  interest: Joi.array().items(Joi.string()).required(),
  weapon: Joi.array().items(Joi.string()).required(),
  social_media: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
      })
    )
    .required(),
});

module.exports = { ProfilePayloadSchema };
