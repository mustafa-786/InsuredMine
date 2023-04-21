import mongoose from "mongoose";
import app from "./app.js";
const port = process.env.SERVER_PORT || 3000;
const MONGO_DB_PATH =  process.env.MONGO_DB_PATH;
mongoose
  .connect(MONGO_DB_PATH)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port} !`);
});
