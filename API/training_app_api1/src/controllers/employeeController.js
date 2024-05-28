const Employee = require("../models/Employee");
const Training = require("../models/Training");

const getEmployees = async (req, res) => {
  const { search } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  try {
    const employees = await Employee.find(query).populate("department");
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};
const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(200).json({ message: "Employee created successfully" });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

const editEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

const employeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error fetching Employee:", err);
    res.status(500).json({ error: "Failed to fetch Employee" });
  }
};

const createTraining = async (req, res) => {
  try {
    const newEmployee = await Training.create(req.body);
    await Employee.updateOne(
      { _id: newEmployee.employeeId },
      { status: "Pending" }
    );
    res
      .status(200)
      .json({ message: "Employee Added to training successfully" });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

const getTrainingById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Training.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error fetching Employee:", err);
    res.status(500).json({ error: "Failed to fetch Employee" });
  }
};

const getTrainings = async (req, res) => {
  const { search, startDate, endDate } = req.query;
  let query = search ? { name: { $regex: search, $options: "i" } } : {};
  if (startDate && endDate) {
    query = {
      ...query,
      createdOn: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }
  try {
    const employees = await Training.find(query)
      .populate("department")
      .populate("skill")
      .populate("subSkillName")
      .populate("employeeId");
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const scheduleTraining = async (req, res) => {
  const { id } = req.params;
  const { employeeId } = req.body;
  const updateData = {
    status: "In progress",
  };

  try {
    const updatedTraining = await Training.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Training scheduled successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};
const employeeTrainingData = async (req, res) => {
  const { search, startDate, endDate } = req.query;
  let query = search ? { name: { $regex: search, $options: "i" } } : {};
  if (startDate && endDate) {
    query = {
      ...query,
      createdOn: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }
  try {
    const employeesData = await Employee.find(query).populate("department");
    const employees = await Training.find(query)
      .populate("department")
      .populate("skill")
      .populate("subSkillName")
      .populate("employeeId");
    res.json({ employees, employeesData });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const getEmployeeEffectiveData = async (req, res) => {
  const { search, startDate, endDate } = req.query;
  let query = search ? { name: { $regex: search, $options: "i" } } : {};
  if (startDate && endDate) {
    query = {
      ...query,
      createdOn: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }
  try {
    const employees = await Training.find(query)
      .populate("department")
      .populate("skill")
      .populate("subSkillName")
      .populate("employeeId");
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const employeeReportData = async (req, res) => {
  const { search, startDate, endDate } = req.query;
  let query = search ? { name: { $regex: search, $options: "i" } } : {};
  if (startDate && endDate) {
    query = {
      ...query,
      createdOn: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }
  try {
    const employeesData = await Employee.find(query).populate("department");

    // const employees = await Training.find(query)
    //   .populate("department")
    //   .populate("skill")
    //   .populate("subSkillName")
    //   .populate("employeeId");
    res.json({ employeesData });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const employeeReportDataById = async (req, res) => {
  const { id } = req.params;
  const { search } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  try {
    const employeesData = await Employee.findById(id).populate("department");
    const trainings = await Training.find({ employeeId: id })
      .populate("skill")
      .populate("subSkillName");
    // const trainings = await Training.find()
    //   .populate("skill")
    //   .populate("subSkillName");
    //   console.log("employeesData", employeesData)
    //   console.log("trainings", trainings)

    res.json({ employeesData, trainings });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// const addScore = async (req, res) => {
//   const { id } = req.params;
//   const { employeeId, status } = req.body;
//   const data = {
//     status,
//   };
//   try {
//     const udateScore = await Training.findByIdAndUpdate(id, req.body);
//     const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, data, {
//       new: true,
//     });
//     res.status(200).json({ message: "Competence score added successfully" });
//   } catch (err) {
//     console.error("Error creating employee:", err);
//     res.status(500).json({ error: "Failed to add competence score" });
//   }
// };

const addScore = async (req, res) => {
  const { id } = req.params;
  const { employeeId, status } = req.body;
  const data = {
    status,
  };
  try {
    let updateScore;

    if (Number(id) !== 0) {
      updateScore = await Training.findByIdAndUpdate(id, req.body);
    } else {
      const newTraining = new Training(req.body);
      updateScore = await newTraining.save();
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, data, {
      new: true,
    });
    res.status(200).json({ message: "Competence score added successfully" });
  } catch (err) {
    console.error("Error adding competence score:", err);
    res.status(500).json({ error: "Failed to add competence score" });
  }
};

const addEffectiveness = async (req, res) => {
  const { id } = req.params;
  const { employeeId, status } = req.body;
  const data = {
    status,
  };
  console.log(req.body);
  try {
    const udateScore = await Training.findByIdAndUpdate(id, req.body);
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, data, {
      new: true,
    });
    res.status(200).json({ message: "Effectiveness added successfully" });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to add competence score" });
  }
};

const getDashboardData = async (req, res) => {
  const statusData = [
    { name: "In progress", value: 67 },
    { name: "Pending", value: 24 },
    { name: "Completed competence", value: 9 },
    { name: "Reschedule Training", value: 9 },
    { name: "Effective", value: 9 },
    { name: "Absent", value: 9 },
    { name: "Not Effective", value: 9 },
  ];
  try {
    const counts = await Training.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {};
    counts.forEach((count) => {
      statusCounts[count._id] = count.count;
    });
    const output = statusData.map((status) => ({
      name: status.name,
      value: statusCounts[status.name] || 0,
    }));

    res.json(output);
  } catch (err) {
    console.error("Error fetching employee counts:", err);
    res.status(500).json({ error: "Failed to fetch employee counts" });
  }
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await Training.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Absent status updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};
module.exports = {
  getEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
  employeeById,
  createTraining,
  getTrainingById,
  getTrainings,
  scheduleTraining,
  employeeTrainingData,
  addScore,
  addEffectiveness,
  getEmployeeEffectiveData,
  employeeReportData,
  employeeReportDataById,
  getDashboardData,
  changeStatus,
};
