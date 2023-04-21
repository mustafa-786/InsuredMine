import express from "express";
const accountRoute = express.Router();
import accountContoller from "../../controllers/Account/AccountController.js";
import file from "../../middleware/fileupload.js";
accountRoute
  .route("/account")
  .post(file, accountContoller.postAccount)
  .get(accountContoller.getAccount);
  accountRoute
  .route("/account/:account_id")
  .get(accountContoller.getAccountById)
  .put(accountContoller.updateAccount)
  .delete(accountContoller.deleteAccount);

export default accountRoute;
