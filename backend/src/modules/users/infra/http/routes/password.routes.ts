import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const forgotPassowrdController = new ForgotPasswordController();
const passwordController = new PasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPassowrdController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      token: Joi.string().uuid(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  passwordController.update,
);

export default passwordRouter;
