import { model, Schema } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  firstname: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  dob: {
    type: Date,
  },
});

export default model("User", userSchema);
