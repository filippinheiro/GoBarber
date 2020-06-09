"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SessionController_1 = __importDefault(require("../controllers/SessionController"));
const sessionsRouter = express_1.Router();
const sessionController = new SessionController_1.default();
sessionsRouter.post('/', sessionController.create);
exports.default = sessionsRouter;
