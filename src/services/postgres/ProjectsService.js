const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");

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
}

module.exports = ProjectsService;
