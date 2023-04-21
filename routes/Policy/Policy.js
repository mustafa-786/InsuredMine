import express from "express";
const policyRoute = express.Router();
import policyContoller from "../../controllers/Policy/PolicyController.js";
import file from "../../middleware/fileupload.js";
policyRoute
  .route("/policy")
  .post(file, policyContoller.postPolicy)
  .get(policyContoller.getPolicy);
policyRoute
  .route("/policy/:policy_id")
  .get(policyContoller.getPolicyById)
  .put(policyContoller.updatePolicy)
  .delete(policyContoller.deletePolicy);

export default policyRoute;
