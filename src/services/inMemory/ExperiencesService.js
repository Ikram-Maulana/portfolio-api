const { nanoid } = require("nanoid");

class ExperiencesService {
  constructor() {
    this._experiences = [];
  }

  addExperience({ period, position, description }) {
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

    this._experiences.push(newExperience);

    const isSuccess =
      this._experiences.filter((experience) => experience.id === id).length > 0;

    if (!isSuccess) {
      throw new Error("Experience gagal ditambahkan");
    }

    return id;
  }

  getExperiences() {
    return this._experiences;
  }

  editExperienceById(id, { period, position, description }) {
    const index = this._experiences.findIndex(
      (experience) => experience.id === id
    );

    if (index === -1) {
      throw new Error("Gagal memperbarui experience. Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();

    this._experiences[index] = {
      ...this._experiences[index],
      period,
      position,
      description,
      updatedAt,
    };
  }

  deleteExperienceById(id) {
    const index = this._experiences.findIndex(
      (experience) => experience.id === id
    );

    if (index === -1) {
      throw new Error("Experience gagal dihapus. Id tidak ditemukan");
    }

    this._experiences.splice(index, 1);
  }
}

module.exports = ExperiencesService;
