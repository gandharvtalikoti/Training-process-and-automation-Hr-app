const skill = require("../models/Skill");

const getSkills = async (req, res) => {
  const { search } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};
  try {
    const skills = await skill.find(query);
    res.json(skills);
  } catch (err) {
    console.error("Error fetching skill:", err);
    res.status(500).json({ error: "Failed to fetch skill" });
  }
};
const createSkill = async (req, res) => {
  try {
    const newskill = await skill.create(req.body);
    res.status(200).json({ message: "New skill added successfully" });
  } catch (err) {
    console.error("Error creating skill:", err);
    res.status(500).json({ error: "Failed to create skill" });
  }
};

const editSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedskill = await skill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "New skill updated successfully" });
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({ error: "Failed to update skill" });
  }
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await skill.findByIdAndDelete(id);
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ error: "Failed to delete skill" });
  }
};

const skillById = async (req, res) => {
  const { id } = req.params;
  try {
    const skills = await skill.findById(id);
    if (!skills) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skills);
  } catch (err) {
    console.error("Error fetching Skill:", err);
    res.status(500).json({ error: "Failed to fetch Skill" });
  }
};


module.exports = {
  getSkills,
  createSkill,
  editSkill,
  deleteSkill,
  skillById
};
