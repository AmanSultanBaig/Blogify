// userController.js
const userService = require("../services/userService");
const BaseHandler = require("../utils/BaseHandler");

class UserController extends BaseHandler {
  constructor() {
    super();
  }

  register = async (req, res) => {
    try {
      const data = await new userService(req).addUser(req.body);
      return this.response(res, data);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  login = async (req, res) => {
    try {
      const data = await new userService(req).login(req.body);
      return this.response(res, data);
    } catch (error) {
      console.error("Error login user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new UserController();
