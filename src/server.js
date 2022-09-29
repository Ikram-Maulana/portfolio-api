// Import dotenv
require("dotenv").config();

const Hapi = require("@hapi/hapi");
const ClientError = require("./exceptions/ClientError");

// Experiences
const experiences = require("./api/experiences");
const ExperiencesService = require("./services/postgres/ExperiencesService");
const ExperiencesValidator = require("./validator/experiences");

const init = async () => {
  const experiencesService = new ExperiencesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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

  // PreRespond
  server.ext("onPreResponse", (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
      });
      newResponse.code(500);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
