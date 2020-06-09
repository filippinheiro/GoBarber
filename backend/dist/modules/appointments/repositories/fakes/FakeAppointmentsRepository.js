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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const date_fns_1 = require("date-fns");
const Appointment_1 = __importDefault(require("../../infra/typeorm/entities/Appointment"));
class AppointmentsRepository {
    constructor() {
        this.appointments = [];
    }
    findByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointment = this.appointments.find((appointment) => {
                return date_fns_1.isEqual(appointment.date, date);
            });
            return findAppointment;
        });
    }
    create({ provider_id, date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = new Appointment_1.default();
            Object.assign(appointment, {
                id: uuidv4_1.uuid(),
                date,
                provider_id,
            });
            this.appointments.push(appointment);
            return appointment;
        });
    }
}
exports.default = AppointmentsRepository;
