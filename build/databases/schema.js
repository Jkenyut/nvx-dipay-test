"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employees = exports.companies = void 0;
//import library
var mongoose_1 = __importStar(require("mongoose"));
var Schema = mongoose_1.default.Schema;
//schema companies
var companiesSchema = new Schema({
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
}, {
    // Use `id` instead of `_id` as the primary key field
    id: true,
    timestamps: false,
    versionKey: false,
    freeze: true,
});
var companies = mongoose_1.default.model("companies", companiesSchema);
exports.companies = companies;
//schema employees
var employeesSchema = new Schema({
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
        type: mongoose_1.Types.ObjectId,
        ref: "companies",
    },
}, {
    // Use `id` instead of `_id` as the primary key field
    id: true,
    timestamps: false,
    versionKey: false,
    freeze: true,
});
var employees = mongoose_1.default.model("employees", employeesSchema);
exports.employees = employees;
