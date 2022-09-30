/* eslint-disable camelcase */
const autoBind = require("auto-bind");

class ProjectsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this); // mem-bind nilai this untuk seluruh method sekaligus
  }

  async postProjectHandler(request, h) {
    this._validator.validateProjectPayload(request.payload);
    const { name, image_link, description, github_link, demo_link } = request.payload;

    const projectId = await this._service.addProject({
      name,
      image_link,
      description,
      github_link,
      demo_link,
    });

    const response = h.response({
      status: "success",
      message: "Experience berhasil ditambahkan",
      data: {
        projectId,
      },
    });
    response.code(201);
    return response;
  }

  async getProjectsHandler() {
    const projects = await this._service.getProjects();
    return {
      status: "success",
      data: {
        projects,
      },
    };
  }

  async putProjectByIdHandler(request, h) {
    this._validator.validateProjectPayload(request.payload);
    const { id } = request.params;

    await this._service.editProjectById(id, request.payload);

    return {
      status: "success",
      message: "Project berhasil diperbarui",
    };
  }

  async deleteProjectByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteProjectById(id);

    return {
      status: "success",
      message: "Project berhasil dihapus",
    };
  }
}

module.exports = ProjectsHandler;
