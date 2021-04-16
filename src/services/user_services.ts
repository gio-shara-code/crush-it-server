import UserModel, { UserInterface } from "../models/user_model";
import { Types } from "mongoose";

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

  async getUserById(id: string) {
    try {
      const docs = await UserModel.find({
        _id: new Types.ObjectId(id),
      });
      if (docs.length === 0) return;
      return docs[0];
    } catch (e) {
      console.log(`UserService[getUserById] failed: ${e}`);
      return;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const docs = await UserModel.find({
        email: email,
      });
      if (docs.length === 0) return;
      return docs[0];
    } catch (e) {
      console.log(`UserService[getUserById] failed: ${e}`);
      return;
    }
  }

  async checkUserExistencyByEmail(email: string): Promise<boolean> {
    try {
      const docs = await UserModel.find({ email: email });
      if (docs.length !== 0) return true;
    } catch (e) {
      console.log(`UserService[checkUserExistency] failed: ${e}`);
      return true;
    }

    return false;
  }
}

export { UserService };
