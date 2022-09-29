const routes = (handler) => [
  {
    method: "POST",
    path: "/experiences",
    handler: handler.postExperienceHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
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
    options: {
      auth: "portfolioapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/experiences/{id}",
    handler: handler.deleteExperienceByIdHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
];

module.exports = routes;
