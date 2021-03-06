import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, isAfter, getDate } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  month: number;
  year: number;
  provider_id: string;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListMonthAvailabilityService {
  constructor(
    @inject('AppointementsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    month,
    year,
    provider_id,
  }: IRequest): Promise<IResponse> {
    const appointmentsInMonth = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, year, month },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    return eachDayArray.map((day) => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointmentsInMonth.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });
  }
}
