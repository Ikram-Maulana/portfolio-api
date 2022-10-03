/* eslint-disable camelcase */
const autoBind = require("auto-bind");

class ProfileHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this); // mem-bind nilai this untuk seluruh method sekaligus
  }

  async postProfileHandler(request, h) {
    this._validator.validateProfilePayload(request.payload);
    const { name, image_url, description, interest, weapon, social_media } = request.payload;

    const profileId = await this._service.addProfile({
      name,
      image_url,
      description,
      interest,
      weapon,
      social_media
    });

    const response = h.response({
      status: "success",
      message: "Profile berhasil ditambahkan",
      data: {
        profileId,
      },
    });
    response.code(201);
    return response;
  }

  async getProfileHandler() {
    const profile = await this._service.getProfile();
    return {
      status: "success",
      data: {
        profile,
      },
    };
  }

  async putProfileByIdHandler(request, h) {
    this._validator.validateProfilePayload(request.payload);
    const { id } = request.params;

    await this._service.editProfileById(id, request.payload);

    return {
      status: "success",
      message: "Profile berhasil diperbarui",
    };
  }

  async deleteProfileByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteProfileById(id);

    return {
      status: "success",
      message: "Profile berhasil dihapus",
    };
  }
}

module.exports = ProfileHandler;
