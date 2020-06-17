import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppoitmentRepository: IAppointmentsRepository;

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppoitmentRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppoitmentRepository,
    );
  });

  it('should be able to list the appointments of a specific day', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 16, 22, 0, 0).getTime();
    });

    const appointment1 = await fakeAppoitmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 5, 17, 10, 0, 0),
    });

    const appointment2 = await fakeAppoitmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 5, 17, 13, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 17,
      month: 6,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
