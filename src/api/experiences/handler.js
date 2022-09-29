class ExperiencesHandler {
  constructor(service) {
    this._service = service;
    this.postExperiencesHandler = this.postExperiencesHandler.bind(this);
    this.getExperiencesHandler = this.getExperiencesHandler.bind(this);
    this.putExperiencesByIdHandler = this.putExperiencesByIdHandler.bind(this);
    this.deleteExperiencesByIdHandler =
      this.deleteExperiencesByIdHandler.bind(this);
  }

  postExperienceHandler(request, h) {
    try {
      const { period, position, description } = request.payload;

      const experienceId = this._service.addExperience({
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
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getExperiencesHandler() {
    const experiences = this._service.getExperiences();
    return {
      status: "success",
      data: {
        experiences,
      },
    };
  }

  putExperienceByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editExperienceById(id, request.payload);

      return {
        status: "success",
        message: "Experience berhasil diperbarui",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteExperienceByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteExperienceById(id);

      return {
        status: "success",
        message: "Experience berhasil dihapus",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = ExperiencesHandler;
