import csv from "csvtojson";
import Account from "../../models/Account/Account.js";

const postAccount = async (req, res) => {
  try {
    const response = await csv().fromFile(req.file.path);
    const account = response.map((data) => {
      const {
        account_name,
        account_type
      } = data;
      const payload = {
        account_name,
        account_type
      };
      return payload;
    });

    await Account.insertMany(account);
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data uploaded successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

const getAccount = async (req, res) => {
  try {
    const account = await Account.find();
    if (!account) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "Account Not Found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      data: account,
    });
  } catch (e) {
    console.log(e);
  }
};

const getAccountById = async (req, res) => {
  try {
    const { account_id } = req.params;
    const account = await Account.findOne({ _id: account_id });
    if (!account) {
      res.status(404).json({
        code: 404,
        status: "fail",
        message: "Account not found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      data: account,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateAccount = async (req, res) => {
  try {
    const { account_id } = req.params;
    const { account_name,
        account_type } =
      req.body;

    const payload = {
        account_name,
        account_type
    };
    await Account.findOneAndUpdate(
      { _id: account_id },
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

const deleteAccount = async (req, res) => {
  try {
    const { account_id } = req.params;

    await Account.deleteOne({ _id: account_id });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Account deleted successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  postAccount,
  getAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
};
