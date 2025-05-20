//import library
import mongoose, {Types} from "mongoose";
import {ICompanies, IEmployees} from "../interface";

const Schema = mongoose.Schema;

//schema companies
const companiesSchema = new Schema(
    {
        company_name: {
            type: String,
            required: true,
            unique: true,
        },
        telephone_number: {
            type: String,
            default: null,
            required: false,
        },
        is_active: {
            type: Boolean,
            default: false,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
    },
    {
        // Use `id` instead of `_id` as the primary key field
        id: true,
        timestamps: false,
        versionKey: false,
        freeze: true,
    }
);

const companies = mongoose.model<ICompanies>("companies", companiesSchema);

//schema employees
const employeesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone_number: {
            type: String,
            default: null,
            required: false,
        },
        jobtitle: {
            type: String,
            enum: ["manager", "director", "staff"],
            default: "staff",
            required: true,
        },
        company_id: {
            type: Types.ObjectId,
            ref: "companies",
        },
    },
    {
        // Use `id` instead of `_id` as the primary key field
        id: true,
        timestamps: false,
        versionKey: false,
        freeze: true,
    }
);

const employees = mongoose.model<IEmployees>("employees", employeesSchema);

export {companies, employees};
