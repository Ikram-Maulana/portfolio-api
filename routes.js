const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello, this is an API for Ikram Maulana's portfolio website";
    },
  },
  {
    method: "GET",
    path: "/projects",
    handler: (request, h) => {
      return "Projects";
    },
  },
  {
    method: "GET",
    path: "/experiences",
    handler: (request, h) => {
      return "Experiences";
    },
  },
];

module.exports = routes;
