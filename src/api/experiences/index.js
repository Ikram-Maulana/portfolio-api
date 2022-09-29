const ExperiencesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "experiences",
  version: "1.0.0",
  register: async (server, { experiencesService, validator }) => {
    const handler = new ExperiencesHandler(experiencesService, validator);
    server.route(routes(handler));
  },
};
