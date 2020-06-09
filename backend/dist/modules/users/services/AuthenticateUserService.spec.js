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
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const AuthenticateUserService_1 = __importDefault(require("./AuthenticateUserService"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let authenticateUser;
describe('Authenticate User', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider);
        authenticateUser = new AuthenticateUserService_1.default(fakeUsersRepository, fakeHashProvider);
    });
    it('should be able to authenticate a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        const response = yield authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    }));
    it('should not be able to authenticate with non existent user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should not be able to authenticate with wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '12346',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
