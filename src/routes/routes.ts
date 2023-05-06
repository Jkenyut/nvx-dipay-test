//import all controllers
import express, { Router } from "express";
import { combination, countries, fibonacci } from "../controllers/tasks";
import { createCompanies, getCompanies, activeCompanies } from "../controllers/companies";
import {
  createEmployees,
  deleteEmployees,
  updateEmployees,
  getEmployees,
  getEmployeesByCompanies,
} from "../controllers/employees";

//difinition of router
const router: Router = express.Router();

//router tasks
router.post("/fibonacci", fibonacci);
router.post("/combination", combination);
router.get("/countries", countries);

//router companies
router.get("/companies", getCompanies);
router.post("/companies", createCompanies);
router.put("/companies/:id/set_active", activeCompanies);

//router employees
router.get("/companies/:id/employees", getEmployeesByCompanies);
router.get("/employees/:id", getEmployees);
router.post("/companies/:company_id/employees", createEmployees);
router.put("/companies/:company_id/employees/:employee_id", updateEmployees);
router.delete("/employees/:id", deleteEmployees);

export default router;
