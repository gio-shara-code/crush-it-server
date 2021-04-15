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

  async getUserById(id: string): Promise<boolean> {
    try {
      const docs = await UserModel.find({ _id: "60781df3d25abbb59da9d51d" });
      if (docs.length !== 0) return true;
      console.log(docs);
    } catch (e) {
      console.log(`UserService[getUserById] failed: ${e}`);
      return false;
    }

    return false;
  }

  async checkIfUserExists() {}
}

export { UserService };
