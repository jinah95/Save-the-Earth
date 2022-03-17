import { UserModel } from "../schemas/user.js";
import { EducationModel } from "../schemas/education.js";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById(id) {
    return await EducationModel.findOne(id);
  }

  static async findEducationsList({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    const educations = await EducationModel.find({ author: user });
    return educations;
  }

  static async findEducation({ id }) {
    return await EducationModel.findOne({ id: id });
  }

  static async putEducation({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEdu = await EducationModel.updateOne(filter, update, option);
    return updateEdu;
  }
}

export { Education };