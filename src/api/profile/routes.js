const routes = (handler) => [
  {
    method: "POST",
    path: "/profile",
    handler: handler.postProfileHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/profile",
    handler: handler.getProfileHandler,
  },
  {
    method: "PUT",
    path: "/profile/{id}",
    handler: handler.putProfileByIdHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/profile/{id}",
    handler: handler.deleteProfileByIdHandler,
    options: {
      auth: "portfolioapp_jwt",
    },
  },
];

module.exports = routes;
