const InvariantError = require("../../exceptions/InvariantError");
const { ProfilePayloadSchema } = require("./schema");

const ProfileValidator = {
  validateProfilePayload: (payload) => {
    const validationResult = ProfilePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ProfileValidator;
