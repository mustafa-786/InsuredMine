import csv from "csvtojson";
import User from "../../models/User/User.js";

const postUser = async (req, res) => {
  try {
    const response = await csv().fromFile(req.file.path);
    const user = response.map((data) => {
      const {
        email,
        gender,
        firstname,
        city,
        phone,
        address,
        state,
        zip,
        dob,
      } = data;
      const payload = {
        email,
        gender,
        firstname,
        city,
        phone,
        address,
        state,
        zip,
        dob,
      };
      return payload;
    });

    await User.insertMany(user);
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data uploaded successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "Users Not Found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      data: users,
    });
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const users = await User.findOne({ _id: user_id });
    if (!users) {
      res.status(404).json({
        code: 404,
        status: "fail",
        message: "user not found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      data: users,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { email, gender, firstname, city, phone, address, state, zip, dob } =
      req.body;

    const payload = {
      email,
      gender,
      firstname,
      city,
      phone,
      address,
      state,
      zip,
      dob,
    };
    await User.findOneAndUpdate(
      { _id: user_id },
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

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    await User.deleteOne({ _id: user_id });
   
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "User deleted successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  postUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
