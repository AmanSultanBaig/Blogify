const userService = require("../services/userService");
class userController {

  async register(req, res) {
    try {
      const data = await new userService(req).addUser(req.body);
      res.json({ message: "User registered successfully", data: data });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    try {
      const data = await new userService(req).getUsers(req.body);
      res.json({ message: "User login successfully", data: data });
    } catch (error) {
      console.error("Error login user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new userController();
