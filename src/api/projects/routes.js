const routes = (handler) => [
  {
    method: "POST",
    path: "/projects",
    handler: handler.postProjectHandler,
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
  },
  {
    method: "DELETE",
    path: "/projects/{id}",
    handler: handler.deleteProjectByIdHandler,
  },
];

module.exports = routes;
