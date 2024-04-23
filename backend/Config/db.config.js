const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://prashanthks:Prashanth%401@cluster10.kpolfzh.mongodb.net/";

//connects with mongo db atlas
const db = async () => {
  try {
    let connection = await mongoose
      .connect(MONGO_URL, {
        dbName: "Test",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected");
      });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = db;
