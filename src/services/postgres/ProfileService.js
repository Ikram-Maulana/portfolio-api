/* eslint-disable camelcase */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapProfileDBToModel } = require("../../utils");

class ProfileService {
  constructor() {
    this._pool = new Pool();
  }

  async addProfile({ name, image_url, interest, weapon }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO profile VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, name, image_url, interest, weapon, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Profile gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getProfile() {
    const result = await this._pool.query("SELECT * FROM profile");
    return result.rows.map(mapProfileDBToModel);
  }

  async editProfileById(id, { name, image_url, interest, weapon }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE profile SET name = $1, image_url = $2, interest = $3, weapon = $4, updated_at = $5 WHERE id = $6 RETURNING id",
      values: [name, image_url, interest, weapon, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui profile. Id tidak ditemukan");
    }
  }

  async deleteProfileById(id) {
    const query = {
      text: "DELETE FROM profile WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Profile gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = ProfileService;
