const ProfileHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "profile",
  version: "1.0.0",
  register: async (server, { profileService, validator }) => {
    const handler = new ProfileHandler(profileService, validator);
    server.route(routes(handler));
  },
};
