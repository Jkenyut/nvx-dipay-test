//import library
import {ResponseData} from "../interface";
import {NextFunction, Request, Response} from "express";

//logic errora
const errorHandler = (error: ResponseData, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.status || 500).json(error);
};
export default errorHandler;

//function response if success
export const successData = (
    status: number = 500,
    data: any = null,
    message: string = "Success"
): ResponseData => {
    const success: ResponseData = {
        status: status,
        code: status.toString(),
        data: data,
        message: message,
    };
    return success;
};

//function to throw error
export const errorData = (
    status: number = 500,
    data: any = null,
    message: string = "error  service"
): ResponseData => {
    const error: ResponseData = {
        status: status,
        code: status.toString(),
        data: data,
        message: message,
    };
    throw error;
};
