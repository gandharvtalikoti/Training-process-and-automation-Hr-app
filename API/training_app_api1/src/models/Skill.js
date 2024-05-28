const mongoose = require("mongoose");
const db = require("../../db");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date },
});

const Skill = db.model("Skill", skillSchema);

module.exports = Skill;
