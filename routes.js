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
    method: "GET",
    path: "/experiences",
    handler: (request, h) => "Experiences",
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => "Halaman tidak ditemukan",
  },
];

module.exports = routes;
