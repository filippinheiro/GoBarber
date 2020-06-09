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
const UserToken_1 = __importDefault(require("../../infra/typeorm/entities/UserToken"));
class FakeUserTokenRepository {
    constructor() {
        this.userTokens = [];
    }
    generate(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = new UserToken_1.default();
            Object.assign(userToken, {
                id: uuidv4_1.uuid(),
                token: uuidv4_1.uuid(),
                user_id,
            });
            this.userTokens.push(userToken);
            return userToken;
        });
    }
    decode(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = this.userTokens.find((findToken) => findToken.token === token);
            return userToken;
        });
    }
}
exports.default = FakeUserTokenRepository;
