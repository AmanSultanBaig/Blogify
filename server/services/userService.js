const userRepository = require("../repositories/userRepository");
const { hashPassword, validateEmail } = require("../utils/utils");
class userService {
  constructor(req) {
    this._req = req;
    this.userRepo = new userRepository(req);
  }

  async addUser(payload) {
    try {
      if (!payload.email || !payload.password) {
        return { message: "Email and password are required", status: 400 };
      }

      if (!validateEmail(payload.email)) {
        return { message: "Invalid Email", status: 400 };
      }
      const encryptPass = hashPassword(payload.password);
      payload.password = encryptPass;
      return await this.userRepo.create(payload);
    } catch (error) {
      throw new Error(`Error adding user: ${error.message}`);
    }
  }

  async getUsers(filters) {
    try {
      return await this.userRepo.get(filters);
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }
}

module.exports = userService;
