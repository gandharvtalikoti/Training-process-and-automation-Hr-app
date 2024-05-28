const mongoose = require('mongoose');
const db = require('../../db')

const subSkillSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  name: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date }
});

const SubSkill = db.model('SubSkill', subSkillSchema);

module.exports = SubSkill;
