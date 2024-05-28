const Employee = require("../models/Employee");

const login = async (req, res) => {
  const { role, email, password } = req.body;
  try {
    const employee = await Employee.findOne({ role, email, password });
    if (employee) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = {
    login
  };