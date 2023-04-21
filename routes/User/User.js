import express from "express";
const userRoute = express.Router();
import userContoller from "../../controllers/User/UserController.js";
import file from "../../middleware/fileupload.js";
userRoute
  .route("/user")
  .post(file, userContoller.postUser)
  .get(userContoller.getUser);
userRoute
  .route("/user/:user_id")
  .get(userContoller.getUserById)
  .put(userContoller.updateUser)
  .delete(userContoller.deleteUser);

export default userRoute;
