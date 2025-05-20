//import all library components
import {NextFunction, Request, Response} from "express";
import {errorData, successData} from "./response";
import {data} from "../interface";
import {companiesSchema, compareObjectId} from "./validate";
import {companies} from "../databases/schema";

//logic create companies
export const createCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate companies
        const validateCompanies = companiesSchema.validate(req.body);
        if (validateCompanies.error) {
            const errorDetails = validateCompanies.error.details.map((detail) => detail.message);
            const errorMessage = errorDetails.join(", ");
            return next(errorData(400, null, errorMessage)); // throw error message
        }

        const {company_name, telephone_number, address} = validateCompanies.value;

        const findCompanies = await companies.findOne({company_name: company_name});
        if (findCompanies) {
            return next(errorData(409, null, "Company Name already exist")); // throw error message
        }

        //build new
        const createad = await companies.create({
            company_name: company_name,
            telephone_number: telephone_number,
            address: address,
        });

        // return create json
        let createdResult: data = {id: createad.id};
        const result = successData(201, createdResult);
        return res.status(201).json(result);
    } catch (err) {
        return next(err); // throw error message
    }
};

//logic get companies
export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //tottal documents
        const totalDocuments = await companies.find({}).countDocuments();
        if (totalDocuments <= 0) {
            return next(errorData(422, null, "Data is not found")); // throw error message
        }
        //find all companies
        const findCompanies = await companies.find({});

        //remake object to response make better
        const plainObjects = findCompanies.map((doc) => {
            const plainObject = {
                id: doc._id.toString(),
                company_name: doc.company_name,
                telephone_number: doc.telephone_number,
                is_active: doc.is_active,
                address: doc.address,
            };
            return plainObject;
        });

        //return response
        let getResult: data = {count: totalDocuments, rows: plainObjects};
        const result = successData(200, getResult);
        return res.status(200).json(result);
    } catch (err) {
        return next(err); // throw error message
    }
};

//logic activateCompanies
export const activeCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate objectId
        const validateObjectId = compareObjectId.validate(req.params);
        if (validateObjectId.error) {
            return next(errorData(422, null, "ObjectId not true")); // throw error message
        }
        const {id} = validateObjectId.value;

        //find companies
        const findCompanies = await companies.findById(id);
        if (!findCompanies) {
            return next(errorData(422, null, "Data is not found")); // throw error message
        }
        if (findCompanies.is_active === true) {
            return next(errorData(400, null, "Company is already active")); // throw error message
        }

        //update companies
        const setCompanies = await companies.findByIdAndUpdate(id, {is_active: true});

        //return response
        let setResult: data = {id: setCompanies?.id, is_active: true};
        const result = successData(201, setResult);
        return res.status(201).json(result);
    } catch (err) {
        return next(err); // throw error message
    }
};
