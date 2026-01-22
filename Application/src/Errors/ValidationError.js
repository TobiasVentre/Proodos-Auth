"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
