const autoBind = require("auto-bind");

class ExperiencesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this); // mem-bind nilai this untuk seluruh method sekaligus
  }

  async postExperienceHandler(request, h) {
    this._validator.validateExperiencePayload(request.payload);
    const { period, position, description } = request.payload;

    const experienceId = await this._service.addExperience({
      period,
      position,
      description,
    });

    const response = h.response({
      status: "success",
      message: "Experience berhasil ditambahkan",
      data: {
        experienceId,
      },
    });
    response.code(201);
    return response;
  }

  async getExperiencesHandler() {
    const experiences = await this._service.getExperiences();
    return {
      status: "success",
      data: {
        experiences,
      },
    };
  }

  async putExperienceByIdHandler(request, h) {
    this._validator.validateExperiencePayload(request.payload);
    const { id } = request.params;

    await this._service.editExperienceById(id, request.payload);

    return {
      status: "success",
      message: "Experience berhasil diperbarui",
    };
  }

  async deleteExperienceByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteExperienceById(id);

    return {
      status: "success",
      message: "Experience berhasil dihapus",
    };
  }
}

module.exports = ExperiencesHandler;
