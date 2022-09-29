const InvariantError = require("../../exceptions/InvariantError");
const { ProjectPayloadSchema } = require("./schema");

const ProjectsValidator = {
  validateProjectPayload: (payload) => {
    const validationResult = ProjectPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ProjectsValidator;
