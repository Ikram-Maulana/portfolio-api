const Hapi = require("@hapi/hapi");
const experiences = require("./api/experiences");
const ExperiencesService = require("./services/inMemory/ExperiencesService");

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

  await server.register({
    plugin: experiences,
    options: {
      service: experiencesService,
    },
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
