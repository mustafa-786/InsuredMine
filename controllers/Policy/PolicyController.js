import csv from "csvtojson";
import Policy from "../../models/Policy/Policy.js";

const postPolicy = async (req, res) => {
  try {
    const response = await csv().fromFile(req.file.path);
    const policy = response.map((data) => {
      const {
        policy_mode,
        policy_number,
        policy_type,
        policy_start_date,
        policy_end_date,
      } = data;
      const payload = {
        policy_mode,
        policy_number,
        policy_type,
        policy_start_date,
        policy_end_date,
      };
      return payload;
    });

    await Policy.insertMany(policy);
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data uploaded successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

const getPolicy = async (req, res) => {
  try {
    const policy = await Policy.find();
    if (!policy) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "Policy Not Found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      data: policy,
    });
  } catch (e) {
    console.log(e);
  }
};

const getPolicyById = async (req, res) => {
  try {
    const { policy_id } = req.params;
    const policy = await Policy.findOne({ _id: policy_id });
    if (!policy) {
      res.status(404).json({
        code: 404,
        status: "fail",
        message: "Policy not found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      data: policy,
    });
  } catch (e) {
    console.log(e);
  }
};

const updatePolicy = async (req, res) => {
  try {
    const { policy_id } = req.params;
    const {
      policy_mode,
      policy_number,
      policy_type,
      policy_start_date,
      policy_end_date,
    } = req.body;

    const payload = {
      policy_mode,
      policy_number,
      policy_type,
      policy_start_date,
      policy_end_date,
    };
    await Policy.findOneAndUpdate(
      { _id: policy_id },
      { $set: payload },
      { new: true }
    );

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data updated successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

const deletePolicy = async (req, res) => {
  try {
    const { policy_id } = req.params;

    await Policy.deleteOne({ _id: policy_id });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Policy deleted successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  postPolicy,
  getPolicy,
  getPolicyById,
  updatePolicy,
  deletePolicy,
};
