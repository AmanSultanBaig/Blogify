const userModel = require("../db/models/userModel");
class userRepository {
  constructor(req) {
    this._req = req;
    this.User = userModel;
  }

  async create(body) {
    try {
      const newUser = new this.User(body);
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async get(filters) {
    try {
      return await this.User.find(filters);
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}

module.exports = userRepository;
