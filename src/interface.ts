//import
import { Document, ObjectId } from "mongoose";

//all interface to run project

export interface ICompanies extends Document {
  id: string;
  company_name: string;
  telephone_number: string;
  is_active: boolean;
  address: string;
}

export interface Companies {
  id: string;
  company_name: string;
  telephone_number: string;
  is_active: boolean;
  address: string;
}

enum job {
  MANAGER = "manager",
  DIRECTOR = "director",
  STAFF = "staff",
}

export interface IEmployees extends Document {
  name: string;
  email: string;
  phone_number: string;
  jobtitle: job;
  company_id: ObjectId;
}

export interface Employees {
  name: string;
  email: string;
  phone_number: string;
  jobtitle: job;
  company_id: ObjectId;
}

export interface ResponseData {
  status?: number;
  code?: string;
  data?: any;
  message?: string;
}

export interface data {
  result?: string | number | string[] | number[] | [string | number];
  company_id?: string;
  id?: ObjectId | string;
  is_active?: boolean;
  count?: number;
  rows?: ICompanies[] | Companies[];
}
