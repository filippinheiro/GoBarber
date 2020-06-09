import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const forgotPassowrdController = new ForgotPasswordController();
const passwordController = new PasswordController();

passwordRouter.post('/forgot', forgotPassowrdController.create);
passwordRouter.post('/reset', passwordController.update);

export default passwordRouter;
