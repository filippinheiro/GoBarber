import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';

export default class PasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    const user = await resetPassword.execute({
      password,
      token,
    });

    return response.json(classToClass(user));
  }
}
