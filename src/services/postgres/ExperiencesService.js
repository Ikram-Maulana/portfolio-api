const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
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
}
