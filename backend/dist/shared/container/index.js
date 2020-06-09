"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const AppoitmentsRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppoitmentsRepository"));
const UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
require("@modules/users/providers");
require("./providers");
tsyringe_1.container.registerSingleton('AppointementsRepository', AppoitmentsRepository_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
