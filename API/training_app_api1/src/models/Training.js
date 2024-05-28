const mongoose = require("mongoose");
const db = require("../../db");

const TrainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  subSkillName: { type: mongoose.Schema.Types.ObjectId, ref: "SubSkill" },
  startDate: { type: String },
  endDate: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  duration: { type: String },
  expectedOutput: { type: String },
  otherSkills: { type: String },
  trainingIdentifiedDate: { type: String },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date },
  status: { type: String },
  score: { type: String },
  actualScore: { type: String },
  effectiveness: { type: String },
  suggestedFaculty: { type: String },
  comment: { type: String },
});

const Training = db.model("Training", TrainingSchema);

module.exports = Training;
