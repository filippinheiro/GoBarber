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
const FakeStorageProvider_1 = __importDefault(require("@shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const UpdateUserAvatarService_1 = __importDefault(require("./UpdateUserAvatarService"));
let fakeUsersRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('Update User Avatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeStorageProvider = new FakeStorageProvider_1.default();
        updateUserAvatar = new UpdateUserAvatarService_1.default(fakeUsersRepository, fakeStorageProvider);
    });
    it(`should be able to update user's avatar`, () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234456',
        });
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    }));
    it(`should not be able to update non existent user's avatar`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updateUserAvatar.execute({
            user_id: '12345',
            avatarFilename: 'avatar.jpg',
        })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    it(`should be able to update user's avatar`, () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234456',
        });
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    }));
    it(`should be able to delete old avatar if it already exists`, () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
        const user = yield fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234456',
        });
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        yield updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    }));
});
