import { model, Schema } from "mongoose";

const policySchema = new Schema({
  policy_mode: {
    type: String,
  },
  policy_number: {
    type: String,
  },
  policy_type: {
    type: String,
  },
  policy_start_date: {
    type: String,
  },
  policy_end_date: {
    type: String,
  },
});

export default model("Policy", policySchema);
