"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareObjectId = exports.employeesSchema = exports.companiesSchema = exports.combinationSchema = exports.fiboncciSchema = void 0;
var joi_1 = __importDefault(require("joi"));
//validate for fiboncci
var fiboncciSchema = joi_1.default.object({
    n: joi_1.default.number().required().min(1).integer().messages({
        "number.base": "n must be a number",
        "number.min": "n must be at least 1",
        "any.required": "n is required",
        "number.empty": "n is required",
    }),
});
exports.fiboncciSchema = fiboncciSchema;
//validate for combination
var combinationSchema = joi_1.default.object({
    n: joi_1.default.number().required().min(0).integer().messages({
        "number.base": "n must be a number",
        "number.min": "n must be at least 0",
        "number.empty": "n or r is required",
        "any.required": "n or r is required",
    }),
    r: joi_1.default.number().required().min(0).integer().messages({
        "number.base": "n must be a number",
        "number.min": "n must be at least 0",
        "number.empty": "n or r is required",
        "any.required": "n or r is required",
    }),
});
exports.combinationSchema = combinationSchema;
//validate for companies
var companiesSchema = joi_1.default.object({
    company_name: joi_1.default.string().required().min(3).max(50).trim().messages({
        "string.base": "company_name must be a string",
        "string.min": "company_name must be at least 3",
        "string.max": "company_name must be less than 50",
        "any.required": "company_name is required",
        "string.empty": "company_name is required",
    }),
    telephone_number: joi_1.default.string().min(8).max(16).optional().trim().messages({
        "string.base": "telephone_number must be a string",
        "string.empty": "telephone_number must be at least 8",
        "string.min": "telephone_number must be at least 8",
        "string.max": "telephone_number must be less than 16",
    }),
    address: joi_1.default.string().min(10).max(50).trim().optional().messages({
        "string.base": "address must be a string",
        "string.min": " address must be at least 10",
        "string.max": " address must be less than 50",
        "string.empty": "address must be at least 10",
    }),
});
exports.companiesSchema = companiesSchema;
//validate for employees
var employeesSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2).trim().max(50).messages({
        "string.base": "name must be a string",
        "string.min": "name must be at least 2",
        "string.max": "name must be less than 50",
        "any.required": "name is required",
        "string.empty": "name is required",
    }),
    email: joi_1.default.string().email().min(5).max(255).trim().required().messages({
        "string.base": "email must be a string",
        "string.min": "email must be at least 5",
        "string.max": "email must be less than 255",
        "string.email": "email must be a valid email address",
        "any.required": "email is required",
        "string.empty": "email is required",
    }),
    phone_number: joi_1.default.string().min(8).max(16).trim().optional().messages({
        "string.base": "phone_number must be a string",
        "string.empty": "phone_number must be at least 8",
        "string.min": "phone_number must be at least 8",
        "string.max": "phone_number must be less than 16",
    }),
    jobtitle: joi_1.default.string()
        .optional()
        .trim()
        .valid("staff", "manager", "director")
        .default("staff")
        .messages({
        "string.base": "jobtitle must be a string",
        "string.min": "jobtitle must be at least 10",
        "string.max": "jobtitle must be less than 50",
        "any.only": "jobtitle must only manager, or director,staff",
    }),
});
exports.employeesSchema = employeesSchema;
//validate for ObjectId mongoDb
var compareObjectId = joi_1.default.object({
    company_id: joi_1.default.string().hex().length(24).optional().trim().messages({
        "string.base": "email must be a string",
    }),
    employee_id: joi_1.default.string().hex().length(24).optional().trim().messages({
        "string.base": "email must be a string",
    }),
    id: joi_1.default.string().hex().length(24).optional().trim().messages({
        "string.base": "email must be a string",
    }),
});
exports.compareObjectId = compareObjectId;
