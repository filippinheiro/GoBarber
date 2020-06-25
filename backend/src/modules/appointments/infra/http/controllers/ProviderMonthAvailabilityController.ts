import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthAvailability from '@modules/appointments/services/ListMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMonthAvailability = container.resolve(ListMonthAvailability);

    const { provider_id } = request.params;

    const { month, year } = request.query;

    const availability = await listMonthAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
    });
    return response.json(availability);
  }
}
