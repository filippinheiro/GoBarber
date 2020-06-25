import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayAvailability from '@modules/appointments/services/ListDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDayAvailability = container.resolve(ListDayAvailability);

    const { provider_id } = request.params;

    const { month, year, day } = request.query;

    const availability = await listDayAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });
    return response.json(availability);
  }
}
