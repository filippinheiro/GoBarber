"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensureAuthenticaded_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticaded"));
const AppointmentController_1 = __importDefault(require("../controllers/AppointmentController"));
const appointmentsRouter = express_1.Router();
const appointmentController = new AppointmentController_1.default();
appointmentsRouter.use(ensureAuthenticaded_1.default);
appointmentsRouter.post('/', appointmentController.create);
exports.default = appointmentsRouter;
