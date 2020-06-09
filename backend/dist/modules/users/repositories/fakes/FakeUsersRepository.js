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
const User_1 = __importDefault(require("../../infra/typeorm/entities/User"));
class UsersRepository {
    constructor() {
        this.users = [];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = this.users.find((item) => {
                return item.id === id;
            });
            return findUser;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = this.users.find((item) => {
                return item.email === email;
            });
            return findUser;
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default();
            Object.assign(newUser, {
                id: uuidv4_1.uuid(),
            }, userData);
            this.users.push(newUser);
            return newUser;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findIndex = this.users.findIndex((item) => {
                return item.id === user.id;
            });
            this.users[findIndex] = user;
            return user;
        });
    }
}
exports.default = UsersRepository;
