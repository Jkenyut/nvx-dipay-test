"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByCompanies = exports.getEmployees = exports.deleteEmployees = exports.updateEmployees = exports.createEmployees = void 0;
var response_1 = require("./response");
var validate_1 = require("./validate");
var schema_1 = require("../databases/schema");
//logic create employees
var createEmployees = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateObjectId, company_id, findCompanies, validateEmployees, errorDetails, errorMessage, _a, name_1, email, phone_number, jobtitle, findEmployees, createad, createdResult, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                validateObjectId = validate_1.compareObjectId.validate(req.params);
                if (validateObjectId.error) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "ObjectId not true"))]; // throw error message
                }
                company_id = validateObjectId.value.company_id;
                return [4 /*yield*/, schema_1.companies.findById(company_id)];
            case 1:
                findCompanies = _b.sent();
                if (!findCompanies) {
                    return [2 /*return*/, next((0, response_1.errorData)(400, null, "Company not found"))]; // throw error message
                }
                validateEmployees = validate_1.employeesSchema.validate(req.body);
                if (validateEmployees.error) {
                    errorDetails = validateEmployees.error.details.map(function (detail) { return detail.message; });
                    errorMessage = errorDetails.join(", ");
                    return [2 /*return*/, next((0, response_1.errorData)(400, null, errorMessage))]; // throw error message
                }
                _a = validateEmployees.value, name_1 = _a.name, email = _a.email, phone_number = _a.phone_number, jobtitle = _a.jobtitle;
                return [4 /*yield*/, schema_1.employees.findOne({ email: email })];
            case 2:
                findEmployees = _b.sent();
                if (findEmployees) {
                    return [2 /*return*/, next((0, response_1.errorData)(409, null, "Email already exist"))]; // throw error message
                }
                return [4 /*yield*/, schema_1.employees.create({
                        name: name_1,
                        email: email,
                        phone_number: phone_number,
                        jobtitle: jobtitle,
                        company_id: company_id,
                    })];
            case 3:
                createad = _b.sent();
                createdResult = { id: createad.id, company_id: company_id };
                result = (0, response_1.successData)(201, createdResult);
                return [2 /*return*/, res.status(201).json(result)];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)]; // throw error message
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createEmployees = createEmployees;
//logic update employees
var updateEmployees = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateObjectId, _a, company_id, employee_id, findCompanies, findEmployees, validateEmployees, errorDetails, errorMessage, _b, name_2, email, phone_number, jobtitle, comparaEmail, updated, updatedResult, result, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                validateObjectId = validate_1.compareObjectId.validate(req.params);
                if (validateObjectId.error) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "ObjectId not true"))];
                }
                _a = validateObjectId.value, company_id = _a.company_id, employee_id = _a.employee_id;
                return [4 /*yield*/, schema_1.companies.findById(company_id)];
            case 1:
                findCompanies = _c.sent();
                if (!findCompanies) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "Company not found"))];
                }
                return [4 /*yield*/, schema_1.employees.findById(employee_id)];
            case 2:
                findEmployees = _c.sent();
                if (!findEmployees) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "Employees not found"))];
                }
                validateEmployees = validate_1.employeesSchema.validate(req.body);
                if (validateEmployees.error) {
                    errorDetails = validateEmployees.error.details.map(function (detail) { return detail.message; });
                    errorMessage = errorDetails.join(", ");
                    return [2 /*return*/, next((0, response_1.errorData)(400, null, errorMessage))];
                }
                _b = validateEmployees.value, name_2 = _b.name, email = _b.email, phone_number = _b.phone_number, jobtitle = _b.jobtitle;
                return [4 /*yield*/, schema_1.employees.findOne({
                        $and: [{ email: email }, { _id: { $ne: employee_id } }],
                    })];
            case 3:
                comparaEmail = _c.sent();
                if (comparaEmail) {
                    return [2 /*return*/, next((0, response_1.errorData)(409, null, "Email already exist"))];
                }
                return [4 /*yield*/, schema_1.employees.findByIdAndUpdate(employee_id, {
                        name: name_2,
                        email: email,
                        phone_numberr: phone_number,
                        jobtitle: jobtitle,
                        company_id: company_id,
                    })];
            case 4:
                updated = _c.sent();
                updatedResult = { id: updated === null || updated === void 0 ? void 0 : updated.id, company_id: company_id };
                result = (0, response_1.successData)(201, updatedResult);
                return [2 /*return*/, res.status(201).json(result)];
            case 5:
                err_2 = _c.sent();
                return [2 /*return*/, next(err_2)]; // throw error message
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateEmployees = updateEmployees;
//logic delete employee
var deleteEmployees = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateObjectId, id, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validateObjectId = validate_1.compareObjectId.validate(req.params);
                if (validateObjectId.error) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "ObjectId not true"))]; // throw error message
                }
                id = validateObjectId.value.id;
                return [4 /*yield*/, schema_1.employees.findByIdAndDelete(id)];
            case 1:
                _a.sent(); //delete employee by id
                return [2 /*return*/, res.status(204).json()]; //return response
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)]; // throw error message
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteEmployees = deleteEmployees;
//logic get employee byid
var getEmployees = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateObjectId, id, findEmployee, plainObject, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validateObjectId = validate_1.compareObjectId.validate(req.params);
                if (validateObjectId.error) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "ObjectId not true"))];
                }
                id = validateObjectId.value.id;
                return [4 /*yield*/, schema_1.employees.findById(id).select("id name phone_number jobtitle")];
            case 1:
                findEmployee = _a.sent();
                if (!findEmployee) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "Data is not found"))]; // throw error message
                }
                plainObject = {
                    id: findEmployee._id.toString(),
                    name: findEmployee.name,
                    phone_number: findEmployee.phone_number,
                    jobtitle: findEmployee.jobtitle,
                };
                result = (0, response_1.successData)(200, plainObject);
                return [2 /*return*/, res.status(200).json(result)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, next(err_4)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployees = getEmployees;
//logic get all employees by companies
var getEmployeesByCompanies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateObjectId, id, findCompanies, findEmployeeByCompanies, plainObjectsEmployees, plainObjects, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                validateObjectId = validate_1.compareObjectId.validate(req.params);
                if (validateObjectId.error) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "ObjectId not true"))];
                }
                id = validateObjectId.value.id;
                return [4 /*yield*/, schema_1.companies.findById(id)];
            case 1:
                findCompanies = _a.sent();
                if (!findCompanies) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "Data is not found"))];
                }
                return [4 /*yield*/, schema_1.employees
                        .find({ company_id: id })
                        .select("id name phone_number jobtitle")];
            case 2:
                findEmployeeByCompanies = _a.sent();
                plainObjectsEmployees = findEmployeeByCompanies === null || findEmployeeByCompanies === void 0 ? void 0 : findEmployeeByCompanies.map(function (doc) {
                    var plainObject = {
                        id: doc._id.toString(),
                        name: doc.name,
                        phone_number: doc.phone_number,
                        jobtitle: doc.jobtitle,
                    };
                    return plainObject;
                });
                plainObjects = {
                    id: findCompanies._id.toString(),
                    company_name: findCompanies.company_name,
                    telephone_number: findCompanies.telephone_number,
                    is_active: findCompanies.is_active,
                    address: findCompanies.address,
                    employees: plainObjectsEmployees,
                };
                result = (0, response_1.successData)(200, plainObjects);
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, next(err_5)]; //throw error message
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeesByCompanies = getEmployeesByCompanies;
