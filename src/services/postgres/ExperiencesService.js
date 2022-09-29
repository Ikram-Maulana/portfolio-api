const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapExperienceDBToModel } = require("../../utils");

class ExperiencesService {
  constructor() {
    this._pool = new Pool();
  }

  async addExperience({ period, position, description }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO experiences VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, period, position, description, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Experience gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getExperiences() {
    const result = await this._pool.query("SELECT * FROM experiences");
    return result.rows.map(mapExperienceDBToModel);
  }

  async editExperienceById(id, { period, position, description }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE experiences SET period = $1, position = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [period, position, description, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
        "Gagal memperbarui experience. Id tidak ditemukan"
      );
    }
  }

  async deleteExperienceById(id) {
    const query = {
      text: "DELETE FROM experiences WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Experience gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = ExperiencesService;
