import ListMonthAvailabilityService from '../services/ListMonthAvailabilityService';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listMonthAvailability: ListMonthAvailabilityService;
let fakeAppoitmentRepository: IAppointmentsRepository;

describe('List MonthAvailability', () => {
  beforeEach(() => {
    fakeAppoitmentRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListMonthAvailabilityService(
      fakeAppoitmentRepository,
    );
  });

  it('should be able to list the days a given provider is available', async () => {
    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 21, 8, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 20, 8, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 3, 8, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 8, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 9, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 10, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 11, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 12, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 13, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 14, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 15, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 16, 0, 0),
    });

    await fakeAppoitmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 17, 0, 0),
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 20,
          available: true,
        },
        {
          day: 21,
          available: false,
        },
        {
          day: 18,
          available: true,
        },
        {
          day: 3,
          available: true,
        },
      ]),
    );
  });
});
