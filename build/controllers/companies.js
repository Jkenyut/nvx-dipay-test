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
exports.activeCompanies = exports.getCompanies = exports.createCompanies = void 0;
var response_1 = require("./response");
var validate_1 = require("./validate");
var schema_1 = require("../databases/schema");
//logic create companies
var createCompanies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateCompanies, errorDetails, errorMessage, _a, company_name, telephone_number, address, findCompanies, createad, createdResult, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                validateCompanies = validate_1.companiesSchema.validate(req.body);
                if (validateCompanies.error) {
                    errorDetails = validateCompanies.error.details.map(function (detail) { return detail.message; });
                    errorMessage = errorDetails.join(", ");
                    return [2 /*return*/, next((0, response_1.errorData)(400, null, errorMessage))]; // throw error message
                }
                _a = validateCompanies.value, company_name = _a.company_name, telephone_number = _a.telephone_number, address = _a.address;
                return [4 /*yield*/, schema_1.companies.findOne({ company_name: company_name })];
            case 1:
                findCompanies = _b.sent();
                if (findCompanies) {
                    return [2 /*return*/, next((0, response_1.errorData)(409, null, "Company Name already exist"))]; // throw error message
                }
                return [4 /*yield*/, schema_1.companies.create({
                        company_name: company_name,
                        telephone_number: telephone_number,
                        address: address,
                    })];
            case 2:
                createad = _b.sent();
                createdResult = { id: createad.id };
                result = (0, response_1.successData)(201, createdResult);
                return [2 /*return*/, res.status(201).json(result)];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)]; // throw error message
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCompanies = createCompanies;
//logic get companies
var getCompanies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var totalDocuments, findCompanies, plainObjects, getResult, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, schema_1.companies.find({}).countDocuments()];
            case 1:
                totalDocuments = _a.sent();
                if (totalDocuments <= 0) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "Data is not found"))]; // throw error message
                }
                return [4 /*yield*/, schema_1.companies.find({})];
            case 2:
                findCompanies = _a.sent();
                plainObjects = findCompanies.map(function (doc) {
                    var plainObject = {
                        id: doc._id.toString(),
                        company_name: doc.company_name,
                        telephone_number: doc.telephone_number,
                        is_active: doc.is_active,
                        address: doc.address,
                    };
                    return plainObject;
                });
                getResult = { count: totalDocuments, rows: plainObjects };
                result = (0, response_1.successData)(200, getResult);
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)]; // throw error message
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCompanies = getCompanies;
//logic activateCompanies
var activeCompanies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validateObjectId, id, findCompanies, setCompanies, setResult, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                validateObjectId = validate_1.compareObjectId.validate(req.params);
                if (validateObjectId.error) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "ObjectId not true"))]; // throw error message
                }
                id = validateObjectId.value.id;
                return [4 /*yield*/, schema_1.companies.findById(id)];
            case 1:
                findCompanies = _a.sent();
                if (!findCompanies) {
                    return [2 /*return*/, next((0, response_1.errorData)(422, null, "Data is not found"))]; // throw error message
                }
                if (findCompanies.is_active === true) {
                    return [2 /*return*/, next((0, response_1.errorData)(400, null, "Company is already active"))]; // throw error message
                }
                return [4 /*yield*/, schema_1.companies.findByIdAndUpdate(id, { is_active: true })];
            case 2:
                setCompanies = _a.sent();
                setResult = { id: setCompanies === null || setCompanies === void 0 ? void 0 : setCompanies.id, is_active: true };
                result = (0, response_1.successData)(201, setResult);
                return [2 /*return*/, res.status(201).json(result)];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)]; // throw error message
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.activeCompanies = activeCompanies;
