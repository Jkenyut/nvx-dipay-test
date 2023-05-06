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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countries = exports.combination = exports.fibonacci = void 0;
var response_1 = require("./response");
var validate_1 = require("./validate");
var axios_1 = __importDefault(require("axios"));
//logic fibonci
var fibonacci = function (req, res, next) {
    try {
        //validate fibonacci
        var validateFibonnci = validate_1.fiboncciSchema.validate(req.body);
        if (validateFibonnci.error) {
            var errorDetails = validateFibonnci.error.details.map(function (detail) { return detail.message; });
            var errorMessage = errorDetails.join(", ");
            return next((0, response_1.errorData)(400, null, errorMessage)); // throw error
        }
        var n = req.body.n;
        //is calculation fibonacci
        var fibo = [];
        var n1 = 0, n2 = 1, nextFibo = void 0;
        if (n === 1) {
            fibo = [0];
        }
        else if (n === 2) {
            fibo = [0, 1];
        }
        else {
            for (var i = 1; i <= n; i++) {
                fibo.push(n1);
                nextFibo = n1 + n2;
                n1 = n2;
                n2 = nextFibo;
            }
        }
        //return result response
        var fiboResult = { result: fibo.join(" ").toString() };
        var result = (0, response_1.successData)(200, fiboResult);
        return res.status(200).json(result);
    }
    catch (err) {
        return next(err); // throw error
    }
};
exports.fibonacci = fibonacci;
//function calculation limit
function combinationCalculation(n) {
    var x = 1;
    for (var i = 1; i <= n; i++) {
        x *= i;
    }
    return x;
}
//logic combination
var combination = function (req, res, next) {
    try {
        //validate combination
        var validateCombination = validate_1.combinationSchema.validate(req.body);
        if (validateCombination.error) {
            var errorDetails = validateCombination.error.details.map(function (detail) { return detail.message; });
            var errorMessage = errorDetails.join(", ");
            return next((0, response_1.errorData)(400, null, errorMessage)); // throw error
        }
        var _a = req.body, n = _a.n, r = _a.r;
        //call function
        var x = combinationCalculation(n);
        var y = combinationCalculation(r);
        var z = combinationCalculation(n - r);
        //logic to calculate combination
        var combinationResult = { result: x / (y * z) };
        //return result response
        var result = (0, response_1.successData)(200, combinationResult);
        return res.status(200).json(result);
    }
    catch (err) {
        return next(err); // throw error
    }
};
exports.combination = combination;
//logic to get information from json url
var countries = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fetchData, response, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json")];
            case 1:
                fetchData = _a.sent();
                //if not ok !200
                if (fetchData.status != 200) {
                    return [2 /*return*/, next((0, response_1.errorData)(400, null, "Something Went Wrong"))]; // throw error
                }
                response = fetchData.data.map(function (country) { return ({
                    name: country.name,
                    region: country.region,
                    timezones: country.timezones,
                }); });
                result = (0, response_1.successData)(200, response);
                return [2 /*return*/, res.status(200).json(result)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)]; // throw error
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.countries = countries;
