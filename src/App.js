import "@fontsource/poppins";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "draft-js/dist/Draft.css";
import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Snackbar from "./Context/Snackbar";
import Loading from "./Layout/Components/Loading";
import { Navigation } from "./Layout/Navigation/";
import { Login, Page } from "./Layout/Pages";

const Payments = lazy(() => import("./Screens/Training"));

const Dashboard = lazy(() => import("./Screens/Dashboard"));
const Training = lazy(() => import("./Screens/Training"));

const Department = lazy(() => import("./Screens/Department"));
const DepartmentDetails = lazy(() =>
  import("./Screens/Department/EditDepartment")
);

const NewEmployee = lazy(() => import("./Screens/NewEmployee"));
const Skills = lazy(() => import("./Screens/Skills"));
const EditSkills = lazy(() => import("./Screens/Skills/EditSkill"));
const SubSkills = lazy(() => import("./Screens/Sub-skills"));
const EditSubSkills = lazy(() => import("./Screens/Sub-skills/EditSubSkills"));

const LoginForm = lazy(() => import("./Screens/Login/LoginForm"));

const Competence = lazy(() => import("./Screens/Competence"));
const EmployeeMaster = lazy(() => import("./Screens/EmployeeMaster"));

const Effectiveness = lazy(() => import("./Screens/Effectiveness"));
const EmployeeDetails = lazy(() => import("./Screens/EmployeeDetails"));

const Reports = lazy(() => import("./Screens/Reports"));
const ReportsDetails = lazy(() => import("./Screens/Reports/ReportsDetails"));



function App() {
  const [primaryColor, setPrimaryColor] = useState("#0a2d5e");

  const handlePrimary = (color) => {
    setPrimaryColor(color);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#092546",
      },
      warning: {
        main: "#fcee30",
      },
      success: {
        main: "#00f090",
      },
      custom: {
        main: "#E3E230",
      },
      text: {
        primary: "#21364C",
      },
      grey: {
        300: "#dfdfdf",
      },
    },
    typography: {
      fontFamily: ["Poppins"].join(","),
      h6: {
        fontSize: "1.1rem",
        fontWeight: 900,
      },
    },
    shape: {
      borderRadius: 10,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Snackbar>
          <Routes>
            <Route path="/" element={<Login />}>
              <Route index element={<LoginForm themFunc={handlePrimary} />} />>
            </Route>
            <Route path="/app" element={<Navigation />}>
              <Route element={<Page />}>
                <Route index element={<Dashboard />} />

                <Route path="payments" element={<Payments />} />

                <Route path="training" element={<Training />} />
                <Route path="department" element={<Department />} />
                <Route
                  path="department/details/:id"
                  element={<DepartmentDetails />}
                />

                <Route path="new-employee/" element={<NewEmployee />} />
                <Route path="new-employee/:id" element={<NewEmployee />} />

                <Route path="skills" element={<Skills />} />
                <Route path="edit-skill/:id" element={<EditSkills />} />

                <Route path="sub-skills" element={<SubSkills />} />
                <Route path="edit-sub-skill/:id" element={<EditSubSkills />} />

                <Route path="competence" element={<Competence />} />

                <Route path="effectiveness" element={<Effectiveness />} />

                <Route path="employee-master" element={<EmployeeMaster />} />

                <Route path="employee-details" element={<EmployeeDetails />} />
                <Route path="reports" element={<Reports />} />
                <Route path="report-details/:id" element={<ReportsDetails />} />


              </Route>
            </Route>
          </Routes>
        </Snackbar>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
