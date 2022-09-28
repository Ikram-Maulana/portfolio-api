const { nanoid } = require("nanoid");
const experiences = require("./experiences");

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

module.exports = {
  addExperienceHandler,
};
