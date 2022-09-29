const routes = (handler) => [
  {
    method: "POST",
    path: "/projects",
    handler: handler.postProjectHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/projects",
    handler: handler.getProjectsHandler,
  },
  {
    method: "PUT",
    path: "/projects/{id}",
    handler: handler.putProjectByIdHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/projects/{id}",
    handler: handler.deleteProjectByIdHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
];

module.exports = routes;
