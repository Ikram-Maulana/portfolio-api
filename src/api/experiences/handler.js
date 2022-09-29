const ClientError = require("../../exceptions/ClientError");

class ExperiencesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postExperienceHandler = this.postExperienceHandler.bind(this);
    this.getExperiencesHandler = this.getExperiencesHandler.bind(this);
    this.putExperienceByIdHandler = this.putExperienceByIdHandler.bind(this);
    this.deleteExperienceByIdHandler =
      this.deleteExperienceByIdHandler.bind(this);
  }

  async postExperienceHandler(request, h) {
    try {
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
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      return response;
    }
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
    try {
      this._validator.validateExperiencePayload(request.payload);
      const { id } = request.params;

      await this._service.editExperienceById(id, request.payload);

      return {
        status: "success",
        message: "Experience berhasil diperbarui",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      return response;
    }
  }

  async deleteExperienceByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteExperienceById(id);

      return {
        status: "success",
        message: "Experience berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = ExperiencesHandler;
