import UserModel, { UserInterface } from "../models/user_model";

class UserService {
  async addUser(user: UserInterface) {
    const usr = new UserModel(user);
    try {
      const doc = await usr.save();
      return doc;
    } catch (e) {
      console.log(`UserService[addUser] failed: ${e}`);
      return;
    }
  }

  async getUser(id: string) {}

  async checkIfUserExists() {}
}

export { UserService };
