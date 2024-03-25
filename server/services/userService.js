const userRepository = require("../repositories/userRepository");
class userService {
  constructor(req) {
    this._req = req;
    this.userRepo = new userRepository(req);
  }

  async addUser(payload) {
    try {
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
