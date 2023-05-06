//import library
import { NextFunction, Request, Response } from "express";
import { errorData, successData } from "./response";
import { combinationSchema, fiboncciSchema } from "./validate";
import { data } from "../interface";
import axios from "axios";

//logic fibonci
export const fibonacci = (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate fibonacci
    const validateFibonnci = fiboncciSchema.validate(req.body);
    if (validateFibonnci.error) {
      const errorDetails = validateFibonnci.error.details.map((detail) => detail.message);
      const errorMessage = errorDetails.join(", ");
      return next(errorData(400, null, errorMessage)); // throw error
    }

    const { n } = req.body;

    //is calculation fibonacci
    let fibo: number[] = [];
    let n1: number = 0,
      n2: number = 1,
      nextFibo: number;

    if (n === 1) {
      fibo = [0];
    } else if (n === 2) {
      fibo = [0, 1];
    } else {
      for (let i = 1; i <= n; i++) {
        fibo.push(n1);
        nextFibo = n1 + n2;
        n1 = n2;
        n2 = nextFibo;
      }
    }

    //return result response
    let fiboResult: data = { result: fibo.join(" ").toString() };
    const result = successData(200, fiboResult);
    return res.status(200).json(result);
  } catch (err) {
    return next(err); // throw error
  }
};

//function calculation limit
function combinationCalculation(n: number) {
  let x: number = 1;
  for (let i = 1; i <= n; i++) {
    x *= i;
  }
  return x;
}

//logic combination
export const combination = (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate combination
    const validateCombination = combinationSchema.validate(req.body);
    if (validateCombination.error) {
      const errorDetails = validateCombination.error.details.map((detail) => detail.message);
      const errorMessage = errorDetails.join(", ");
      return next(errorData(400, null, errorMessage)); // throw error
    }
    const { n, r } = req.body;

    //call function
    const x = combinationCalculation(n);
    const y = combinationCalculation(r);
    const z = combinationCalculation(n - r);

    //logic to calculate combination
    let combinationResult: data = { result: x / (y * z) };

    //return result response
    const result = successData(200, combinationResult);
    return res.status(200).json(result);
  } catch (err) {
    return next(err); // throw error
  }
};

//logic to get information from json url
export const countries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //fetch data
    const fetchData = await axios.get(
      "https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json"
    );
    //if not ok !200
    if (fetchData.status != 200 || fetchData.status == null) {
      return next(errorData(400, null, "Something Went Wrong")); // throw error
    }

    //get object we want
    const response = fetchData.data.map(
      (country: { name: string; region: string; timezones: string[] }) => ({
        name: country.name,
        region: country.region,
        timezones: country.timezones,
      })
    );

    //return response
    const result = successData(200, response);
    return res.status(200).json(result);
  } catch (err) {
    return next(err); // throw error
  }
};
