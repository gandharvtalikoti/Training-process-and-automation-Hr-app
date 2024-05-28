// Database init
const mongoose = require("mongoose");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
// const uri = "mongodb+srv://Gandharv:Gandharv123@cluster0.3d5dbc3.mongodb.net/Training_app";
const uri =
  "mongodb+srv://shaheenkadakol:JcK8M0Cc1E8RPzDT@cluster0.owc5bgd.mongodb.net/Training_app";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err.reason));

module.exports = db;
