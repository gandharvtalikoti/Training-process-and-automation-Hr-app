const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.editEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.get("/employeeById/:id", employeeController.employeeById);
router.post("/training", employeeController.createTraining);
router.get("/trainings", employeeController.getTrainings);
router.get("/getTrainingById/:id", employeeController.getTrainingById);
router.put("/schedule-training/:id", employeeController.scheduleTraining);
router.get("/employees-training-data", employeeController.employeeTrainingData);
router.put("/add-score/:id", employeeController.addScore);
router.put("/add-effectiveness/:id", employeeController.addEffectiveness);
router.get("/employees-effective-data", employeeController.getEmployeeEffectiveData);
router.get("/employees-report-data", employeeController.employeeReportData);
router.get("/employees-report-data-by-id/:id", employeeController.employeeReportDataById);

router.get("/dashboard", employeeController.getDashboardData);

router.put("/status-change/:id", employeeController.changeStatus);







module.exports = router;
