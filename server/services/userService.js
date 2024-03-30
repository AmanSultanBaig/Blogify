const userRepository = require("../repositories/userRepository");
const {
  hashPassword,
  validateEmail,
  compateHashedPassword,
  generateAuthToken,
} = require("../utils/utils");
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

      const userExist = await this.userRepo.getSingleUser({
        email: payload.email,
      });

      if (userExist) {
        return { message: "User Already Exist!", status: 409 };
      }
      const encryptPass = hashPassword(payload.password);
      payload.password = encryptPass;
      const createdUser = await this.userRepo.create(payload);
      return { message: "User Created Successfully!", data: createdUser };
    } catch (error) {
      throw new Error(`Error adding user: ${error.message}`);
    }
  }

  async login(body) {
    const { email, password } = body;
    try {
      const userExist = await this.userRepo.getSingleUser({ email });
      if (!userExist) {
        return { message: "no user found with this email", status: 404 };
      }

      const isCorrectPassword = compateHashedPassword(
        password,
        userExist.password
      );

      if (!isCorrectPassword) {
        return { message: "wrong credentials, please try again!", status: 400 };
      }

      const accessToken = generateAuthToken({
        id: userExist.id,
        fullname: userExist.full_name,
        email: userExist.email,
      });

      const data = { accessToken };

      return { message: "LoggedIn Successfully!", data };
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }
}

module.exports = userService;
