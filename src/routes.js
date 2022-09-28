const { addExperienceHandler, getAllExperiencesHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) =>
      "Hello, this is an API for Ikram Maulana's portfolio website",
  },
  {
    method: "GET",
    path: "/projects",
    handler: (request, h) => "Projects",
  },
  {
    method: "POST",
    path: "/experiences",
    handler: addExperienceHandler,
  },
  {
    method: "GET",
    path: "/experiences",
    handler: getAllExperiencesHandler,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => "Halaman tidak ditemukan",
  },
];

module.exports = routes;
