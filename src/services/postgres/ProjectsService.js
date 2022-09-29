const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapProjectsDBToModel } = require("../../utils");

class ProjectsService {
  constructor() {
    this._pool = new Pool();
  }

  async addProject({ name, imageLink, tech, githubLink, demoLink }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO projects VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [
        id,
        name,
        imageLink,
        tech,
        githubLink,
        demoLink,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Project gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getProjects() {
    const result = await this._pool.query("SELECT * FROM projects");
    return result.rows.map(mapProjectsDBToModel);
  }

  async editProjectById(id, { name, imageLink, tech, githubLink, demoLink }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE projects SET name = $1, image_link = $2, tech = $3, github_link = $4, demo_link = $5, updated_at = $6 WHERE id = $7 RETURNING id",
      values: [name, imageLink, tech, githubLink, demoLink, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui project. Id tidak ditemukan");
    }
  }

  async deleteProjectById(id) {
    const query = {
      text: "DELETE FROM projects WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Project gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = ProjectsService;
