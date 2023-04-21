import { model, Schema } from "mongoose";
const accountSchema = new Schema({
  account_name: {
    type: String,
  },
  account_type: {
    type: String,
  },
});

export default model("Account", accountSchema);
