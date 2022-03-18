import { CertificateModel } from "../schemas/certificate.js";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByTitle({ title }) {
    const certificate = await CertificateModel.findOne({ title }).populate('user');
    return certificate;
  }

  static async findById({ id }) {
    const certificate = await CertificateModel.findOne({ id }).populate('user');
    return certificate;
  }

  static async findByUser({ user }) {
    const certificates = await CertificateModel.find({ user }).populate('user');
    return certificates;
  }

  static async find(filter) {
    const certificates = await CertificateModel.find(filter).populate('user');
    return certificates;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async delete({ user_id }) {
    await CertificateModel.deleteOne({ user_id });
  }
}

export { Certificate };