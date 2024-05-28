const Department = require("../models/Department");

const getDepartments = async (req, res) => {
  const { search } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};
  try {
    const departments = await Department.find(query);
    res.json(departments);
  } catch (err) {
    console.error("Error fetching Department:", err);
    res.status(500).json({ error: "Failed to fetch Department" });
  }
};
const createDepartment = async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body);
    res.status(200).json({ message: "Department added successfully" });
  } catch (err) {
    console.error("Error creating Department:", err);
    res.status(500).json({ error: "Failed to create Department" });
  }
};

const editDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    console.error("Error updating Department:", err);
    res.status(500).json({ error: "Failed to update Department" });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    console.error("Error deleting Department:", err);
    res.status(500).json({ error: "Failed to delete Department" });
  }
};

const departmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(department);
  } catch (err) {
    console.error("Error fetching Department:", err);
    res.status(500).json({ error: "Failed to fetch Department" });
  }
};


module.exports = {
  getDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment,
  departmentById
};
