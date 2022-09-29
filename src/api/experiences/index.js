const routes = require("./routes");
const ExperiencesHandler = require("./handler");

module.export = {
  name: "experiences",
  version: "1.0.0",
  register: async (server, { service }) => {
    const experiencesHandler = new ExperiencesHandler(service);
    server.route(routes(experiencesHandler));
  },
};
