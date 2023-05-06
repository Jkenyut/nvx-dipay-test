import Joi from "joi";

//validate for fiboncci
const fiboncciSchema = Joi.object({
  n: Joi.number().required().min(1).integer().messages({
    "number.base": "n must be a number",
    "number.min": "n must be at least 1",
    "any.required": "n is required",
    "number.empty": "n is required",
  }),
});

//validate for combination
const combinationSchema = Joi.object({
  n: Joi.number().required().min(0).integer().messages({
    "number.base": "n must be a number",
    "number.min": "n must be at least 0",
    "number.empty": "n or r is required",
    "any.required": "n or r is required",
  }),
  r: Joi.number().required().min(0).integer().messages({
    "number.base": "n must be a number",
    "number.min": "n must be at least 0",
    "number.empty": "n or r is required",
    "any.required": "n or r is required",
  }),
});

//validate for companies
const companiesSchema = Joi.object({
  company_name: Joi.string().required().min(3).max(50).trim().messages({
    "string.base": "company_name must be a string",
    "string.min": "company_name must be at least 3",
    "string.max": "company_name must be less than 50",
    "any.required": "company_name is required",
    "string.empty": "company_name is required",
  }),
  telephone_number: Joi.string().min(8).max(16).optional().trim().messages({
    "string.base": "telephone_number must be a string",
    "string.empty": "telephone_number must be at least 8",
    "string.min": "telephone_number must be at least 8",
    "string.max": "telephone_number must be less than 16",
  }),
  address: Joi.string().min(10).max(50).trim().optional().messages({
    "string.base": "address must be a string",
    "string.min": " address must be at least 10",
    "string.max": " address must be less than 50",
    "string.empty": "address must be at least 10",
  }),
});


//validate for employees
const employeesSchema = Joi.object({
  name: Joi.string().required().min(2).trim().max(50).messages({
    "string.base": "name must be a string",
    "string.min": "name must be at least 2",
    "string.max": "name must be less than 50",
    "any.required": "name is required",
    "string.empty": "name is required",
  }),
  email: Joi.string().email().min(5).max(255).trim().required().messages({
    "string.base": "email must be a string",
    "string.min": "email must be at least 5",
    "string.max": "email must be less than 255",
    "string.email": "email must be a valid email address",
    "any.required": "email is required",
    "string.empty": "email is required",
  }),
  phone_number: Joi.string().min(8).max(16).trim().optional().messages({
    "string.base": "phone_number must be a string",
    "string.empty": "phone_number must be at least 8",
    "string.min": "phone_number must be at least 8",
    "string.max": "phone_number must be less than 16",
  }),
  jobtitle: Joi.string()
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


//validate for ObjectId mongoDb
const compareObjectId = Joi.object({
  company_id: Joi.string().hex().length(24).optional().trim().messages({
    "string.base": "email must be a string",
  }),
  employee_id: Joi.string().hex().length(24).optional().trim().messages({
    "string.base": "email must be a string",
  }),
  id: Joi.string().hex().length(24).optional().trim().messages({
    "string.base": "email must be a string",
  }),
});
export { fiboncciSchema, combinationSchema, companiesSchema, employeesSchema, compareObjectId };
