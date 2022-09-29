const routes = require("./routes");
const ExperiencesHandler = require("./handler");

module.export = {
  name: "experiences",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const experiencesHandler = new ExperiencesHandler(service, validator);
    server.route(routes(experiencesHandler));
  },
};
