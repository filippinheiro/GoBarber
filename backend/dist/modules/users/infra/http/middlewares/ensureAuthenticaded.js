"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("@config/auth"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
function ensureAuthenticaded(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader)
        throw new AppError_1.default('JWT is missing', 401);
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        const { sub } = decoded;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (_a) {
        throw new AppError_1.default('Invalid JWT token', 401);
    }
}
exports.default = ensureAuthenticaded;
