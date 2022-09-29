const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const AuthenticationError = require("../../exceptions/AuthenticationError");

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError("Kredensial yang Anda berikan salah");
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Kredensial yang Anda berikan salah");
    }
    return id;
  }
}

module.exports = UsersService;
