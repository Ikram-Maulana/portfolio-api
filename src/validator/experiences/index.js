const { ExperiencePayloadSchema } = require("./schema");

const ExperiencesValidator = {
  validateExperiencePayload: (payload) => {
    const validationResult = ExperiencePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = ExperiencesValidator;
