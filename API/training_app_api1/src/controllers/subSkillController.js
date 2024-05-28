const subSkill = require("../models/SubSkill");

const getSubSkills = async (req, res) => {
  const { search } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  try {
    const subSkills = await subSkill.find(query).populate('skill');
    res.json(subSkills);
  } catch (err) {
    console.error("Error fetching subSkill:", err);
    res.status(500).json({ error: "Failed to fetch subSkill" });
  }
};
const createSubSkill = async (req, res) => {
  try {
    const newsubSkill = await subSkill.create(req.body);
    res.status(200).json({ message: "Skill created successfully" });
  } catch (err) {
    console.error("Error creating subSkill:", err);
    res.status(500).json({ error: "Failed to create subSkill" });
  }
};

const editSubSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedsubSkill = await subSkill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Skill updated successfully" });
  } catch (err) {
    console.error("Error updating subSkill:", err);
    res.status(500).json({ error: "Failed to update subSkill" });
  }
};

const deleteSubSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await subSkill.findByIdAndDelete(id);
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Error deleting subSkill:", err);
    res.status(500).json({ error: "Failed to delete subSkill" });
  }
};

const subSkillById = async (req, res) => {
  const { id } = req.params;
  try {
    const subSkills = await subSkill.findById(id);
    if (!subSkills) {
      return res.status(404).json({ error: "Sub skill not found" });
    }
    res.json(subSkills);
  } catch (err) {
    console.error("Error fetching Skill:", err);
    res.status(500).json({ error: "Failed to fetch Skill" });
  }
};


module.exports = {
  getSubSkills,
  createSubSkill,
  editSubSkill,
  deleteSubSkill,
  subSkillById  
};
