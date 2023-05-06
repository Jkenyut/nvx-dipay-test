"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import all controllers
var express_1 = __importDefault(require("express"));
var tasks_1 = require("../controllers/tasks");
var companies_1 = require("../controllers/companies");
var employees_1 = require("../controllers/employees");
//difinition of router
var router = express_1.default.Router();
//router tasks
router.post("/fibonacci", tasks_1.fibonacci);
router.post("/combination", tasks_1.combination);
router.get("/countries", tasks_1.countries);
//router companies
router.get("/companies", companies_1.getCompanies);
router.post("/companies", companies_1.createCompanies);
router.put("/companies/:id/set_active", companies_1.activeCompanies);
//router employees
router.get("/companies/:id/employees", employees_1.getEmployeesByCompanies);
router.get("/employees/:id", employees_1.getEmployees);
router.post("/companies/:company_id/employees", employees_1.createEmployees);
router.put("/companies/:company_id/employees/:employee_id", employees_1.updateEmployees);
router.delete("/employees/:id", employees_1.deleteEmployees);
exports.default = router;
