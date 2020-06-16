import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProvider = container.resolve(ListProvidersService);

    const providers = await listProvider.execute({
      user_id: id,
    });
    return response.json(providers);
  }
}
