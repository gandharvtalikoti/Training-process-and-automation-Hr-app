const mongoose = require('mongoose');
const db = require('../../db')

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true},
  designation: { type: String },
  address: { type: String, required: true },
  height: { type: String },
  weight: { type: String },
  gender: { type: String},
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  qualification: { type: String },
  role: { type: String, required: true },
  experience: { type: String },
  password: { type: String, required: true },
  others: { type: String },
  skills: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date },
  status: { type: String }
});

const Employee = db.model('Employee', employeeSchema);

module.exports = Employee;
