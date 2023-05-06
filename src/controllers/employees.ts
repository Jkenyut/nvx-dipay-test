// import library components
import { NextFunction, Request, Response } from "express";
import { errorData, successData } from "./response";
import { data } from "../interface";
import { employeesSchema, compareObjectId } from "./validate";
import { companies, employees } from "../databases/schema";

//logic create employees
export const createEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate objectId
    const validateObjectId = compareObjectId.validate(req.params);
    if (validateObjectId.error) {
      return next(errorData(422, null, "ObjectId not true")); // throw error message
    }
    const { company_id } = validateObjectId.value;
    const findCompanies = await companies.findById(company_id);
    if (!findCompanies) {
      return next(errorData(400, null, "Company not found")); // throw error message
    }

    //validate employee
    const validateEmployees = employeesSchema.validate(req.body);
    if (validateEmployees.error) {
      const errorDetails = validateEmployees.error.details.map((detail) => detail.message);
      const errorMessage = errorDetails.join(", ");
      return next(errorData(400, null, errorMessage)); // throw error message
    }

    const { name, email, phone_number, jobtitle } = validateEmployees.value;

    //find one with email
    const findEmployees = await employees.findOne({ email: email });

    if (findEmployees) {
      return next(errorData(409, null, "Email already exist")); // throw error message
    }

    //create a new employee
    const createad = await employees.create({
      name: name,
      email: email,
      phone_number: phone_number,
      jobtitle: jobtitle,
      company_id: company_id,
    });

    //return result response
    let createdResult: data = { id: createad.id, company_id: company_id };
    const result = successData(201, createdResult);
    return res.status(201).json(result);
  } catch (err) {
    return next(err); // throw error message
  }
};

//logic update employees
export const updateEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate objectId
    const validateObjectId = compareObjectId.validate(req.params);
    if (validateObjectId.error) {
      return next(errorData(422, null, "ObjectId not true"));
    }

    const { company_id, employee_id } = validateObjectId.value;

    //find company and employees if not found throw error message
    const findCompanies = await companies.findById(company_id);
    if (!findCompanies) {
      return next(errorData(422, null, "Company not found"));
    }
    const findEmployees = await employees.findById(employee_id);
    if (!findEmployees) {
      return next(errorData(422, null, "Employees not found"));
    }

    //validate employees
    const validateEmployees = employeesSchema.validate(req.body);
    if (validateEmployees.error) {
      const errorDetails = validateEmployees.error.details.map((detail) => detail.message);
      const errorMessage = errorDetails.join(", ");
      return next(errorData(400, null, errorMessage));
    }

    const { name, email, phone_number, jobtitle } = validateEmployees.value;

    //find employee by email but not id update if found // throw error message
    const comparaEmail = await employees.findOne({
      $and: [{ email }, { _id: { $ne: employee_id } }],
    });
    if (comparaEmail) {
      return next(errorData(409, null, "Email already exist"));
    }

    //update data employee
    const updated = await employees.findByIdAndUpdate(employee_id, {
      name: name,
      email: email,
      phone_numberr: phone_number,
      jobtitle: jobtitle,
      company_id: company_id,
    });

    //return result employee
    let updatedResult: data = { id: updated?.id, company_id: company_id };
    const result = successData(201, updatedResult);
    return res.status(201).json(result);
  } catch (err) {
    return next(err); // throw error message
  }
};

//logic delete employee
export const deleteEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate objectId
    const validateObjectId = compareObjectId.validate(req.params);
    if (validateObjectId.error) {
      return next(errorData(422, null, "ObjectId not true")); // throw error message
    }
    const { id } = validateObjectId.value;

    await employees.findByIdAndDelete(id); //delete employee by id

    return res.status(204).json(); //return response
  } catch (err) {
    return next(err); // throw error message
  }
};

//logic get employee byid
export const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate object id
    const validateObjectId = compareObjectId.validate(req.params);
    if (validateObjectId.error) {
      return next(errorData(422, null, "ObjectId not true"));
    }
    const { id } = validateObjectId.value;

    const findEmployee = await employees.findById(id).select("id name phone_number jobtitle"); //find employee

    if (!findEmployee) {
      return next(errorData(422, null, "Data is not found")); // throw error message
    }

    //remake object to response better
    const plainObject = {
      id: findEmployee._id.toString(),
      name: findEmployee.name,
      phone_number: findEmployee.phone_number,
      jobtitle: findEmployee.jobtitle,
    };

    //return result response
    const result = successData(200, plainObject);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

//logic get all employees by companies
export const getEmployeesByCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate objectId
    const validateObjectId = compareObjectId.validate(req.params);
    if (validateObjectId.error) {
      return next(errorData(422, null, "ObjectId not true"));
    }
    const { id } = validateObjectId.value;

    //find companies but not found  throw error message
    const findCompanies = await companies.findById(id);
    if (!findCompanies) {
      return next(errorData(422, null, "Data is not found"));
    }
    const findEmployeeByCompanies = await employees
      .find({ company_id: id })
      .select("id name phone_number jobtitle");

    //remake object for response better from employees
    const plainObjectsEmployees = findEmployeeByCompanies?.map((doc) => {
      const plainObject = {
        id: doc._id.toString(),
        name: doc.name,
        phone_number: doc.phone_number,
        jobtitle: doc.jobtitle,
      };
      return plainObject;
    });

    //this is object response
    const plainObjects = {
      id: findCompanies._id.toString(),
      company_name: findCompanies.company_name,
      telephone_number: findCompanies.telephone_number,
      is_active: findCompanies.is_active,
      address: findCompanies.address,
      employees: plainObjectsEmployees,
    };

    //return result response
    const result = successData(200, plainObjects);
    return res.status(200).json(result);
  } catch (err) {
    return next(err); //throw error message
  }
};
