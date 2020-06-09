"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const ensureAuthenticaded_1 = __importDefault(require("../middlewares/ensureAuthenticaded"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
const userController = new UserController_1.default();
const userAvatarController = new UserAvatarController_1.default();
usersRouter.post('/', userController.create);
usersRouter.patch('/avatar', ensureAuthenticaded_1.default, upload.single('avatar'), userAvatarController.update);
exports.default = usersRouter;
