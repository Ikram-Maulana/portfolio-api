const ProjectsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "projects",
  version: "1.0.0",
  register: async (server, { projectsService, validator }) => {
    const handler = new ProjectsHandler(projectsService, validator);
    server.route(routes(handler));
  },
};
