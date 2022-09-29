const routes = (handler) => [
  {
    method: "POST",
    path: "/experiences",
    handler: handler.postExperienceHandler,
  },
  {
    method: "GET",
    path: "/experiences",
    handler: handler.getExperiencesHandler,
  },
  {
    method: "PUT",
    path: "/experiences/{id}",
    handler: handler.putExperienceByIdHandler,
  },
  {
    method: "DELETE",
    path: "/experiences/{id}",
    handler: handler.deleteExperienceByIdHandler,
  },
];

module.exports = routes;
