import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  month: number;
  day: number;
  year: number;
  provider_id: string;
}

@injectable()
export default class ListMonthAvailabilityService {
  constructor(
    @inject('AppointementsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    month,
    year,
    day,
    provider_id,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { month, year, day, provider_id },
    );

    return appointments;
  }
}
