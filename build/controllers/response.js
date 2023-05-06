"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorData = exports.successData = void 0;
//logic errora
var errorHandler = function (error, req, res, next) {
    return res.status(error.status || 500).json(error);
};
exports.default = errorHandler;
//function response if success
var successData = function (status, data, message) {
    if (status === void 0) { status = 500; }
    if (data === void 0) { data = null; }
    if (message === void 0) { message = "Success"; }
    var success = {
        status: status,
        code: status.toString(),
        data: data,
        message: message,
    };
    return success;
};
exports.successData = successData;
//function to throw error
var errorData = function (status, data, message) {
    if (status === void 0) { status = 500; }
    if (data === void 0) { data = null; }
    if (message === void 0) { message = "error  service"; }
    var error = {
        status: status,
        code: status.toString(),
        data: data,
        message: message,
    };
    throw error;
};
exports.errorData = errorData;
