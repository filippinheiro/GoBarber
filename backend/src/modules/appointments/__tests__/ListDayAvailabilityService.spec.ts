import ListDayAvailabilityService from '../services/ListDayAvailabilityService';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listDayAvailability: ListDayAvailabilityService;
let fakeAppoitmentRepository: IAppointmentsRepository;

describe('ListDayAvailability', () => {
  beforeEach(() => {
    fakeAppoitmentRepository = new FakeAppointmentsRepository();
    listDayAvailability = new ListDayAvailabilityService(
      fakeAppoitmentRepository,
    );
  });

  it('should be able to list the status of availability from a provider in a day', async () => {
    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 21, 14, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 21, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 21, 11).getTime();
    });

    const availability = await listDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 6,
      day: 21,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 14,
          available: false,
        },
        {
          hour: 15,
          available: false,
        },
        {
          hour: 16,
          available: true,
        },
        {
          hour: 17,
          available: true,
        },
      ]),
    );
  });
});
