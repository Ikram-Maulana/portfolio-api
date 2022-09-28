const { nanoid } = require("nanoid");
const experiences = require("../../experiences");

const addExperienceHandler = (request, h) => {
  const { period, position, description } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newExperience = {
    id,
    period,
    position,
    description,
    createdAt,
    updatedAt,
  };

  experiences.push(newExperience);

  const isSuccess = experiences.filter((experience) => experience.id === id);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Experience berhasil ditambahkan",
      data: {
        experienceId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Experience gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllExperiencesHandler = () => ({
  status: "success",
  data: {
    experiences,
  },
});

const editExperienceByIdHandler = (request, h) => {
  const { id } = request.params;

  const { period, position, description } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = experiences.findIndex((experience) => experience.id === id);

  if (index !== -1) {
    experiences[index] = {
      ...experiences[index],
      period,
      position,
      description,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Experience berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui experience. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteExperienceByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = experiences.findIndex((experience) => experience.id === id);

  if (index !== -1) {
    experiences.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Experience berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Experience gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addExperienceHandler,
  getAllExperiencesHandler,
  editExperienceByIdHandler,
  deleteExperienceByIdHandler,
};
