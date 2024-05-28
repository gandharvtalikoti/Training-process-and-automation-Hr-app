const mongoose = require('mongoose');
const db = require('../../db')

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date }
});

const Department = db.model('Department', departmentSchema);

module.exports = Department;
