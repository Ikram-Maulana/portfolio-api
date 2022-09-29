const Hapi = require("@hapi/hapi");
const experiences = require("./api/experiences");
const ExperiencesService = require("./services/inMemory/ExperiencesService");
const ExperiencesValidator = require("./validator/experiences");

const init = async () => {
  const experiencesService = new ExperiencesService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: () =>
      "Hello, this is an API for Ikram Maulana's portfolio website",
  });

  // Register internal plugin
  await server.register({
    plugin: experiences,
    options: {
      experiencesService,
      validator: ExperiencesValidator,
    },
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
