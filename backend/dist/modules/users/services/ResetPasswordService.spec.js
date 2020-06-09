"use strict";
// import AppError from '@shared/errors/AppError';
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
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const ResetPasswordService_1 = __importDefault(require("./ResetPasswordService"));
const FakeUserTokensRepository_1 = __importDefault(require("../repositories/fakes/FakeUserTokensRepository"));
let fakeUsersRepository;
let fakeUserTokensRepository;
let resetPassword;
describe('Reset Password', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeUserTokensRepository = new FakeUserTokensRepository_1.default();
        resetPassword = new ResetPasswordService_1.default(fakeUsersRepository, fakeUserTokensRepository);
    });
    it('should be able to reset password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234456',
        });
        const { token } = yield fakeUserTokensRepository.generate(user.id);
        yield resetPassword.execute({
            password: '123123',
            token,
        });
        const updateUser = yield fakeUsersRepository.findById(user.id);
        expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('123123');
    }));
});
