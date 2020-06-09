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
const FakeMailProvider_1 = __importDefault(require("@shared/container/providers/MailProvider/fakes/FakeMailProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const SendForgotPasswordEmailService_1 = __importDefault(require("./SendForgotPasswordEmailService"));
const FakeUserTokensRepository_1 = __importDefault(require("../repositories/fakes/FakeUserTokensRepository"));
let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('Send Forgot Password Email', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeMailProvider = new FakeMailProvider_1.default();
        fakeUserTokensRepository = new FakeUserTokensRepository_1.default();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService_1.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
    });
    it('should be able to recover password informing an email address', () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        yield fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        yield sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });
        expect(sendMail).toHaveBeenCalled();
    }));
    it('should not be able to recover a password of a email that is not registered', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it('should be able to generate a valid reset password token', () => __awaiter(void 0, void 0, void 0, function* () {
        const generate = jest.spyOn(fakeUserTokensRepository, 'generate');
        yield fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        yield sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });
        expect(generate).toHaveBeenCalled();
    }));
});
