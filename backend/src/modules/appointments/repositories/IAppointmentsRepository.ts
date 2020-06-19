import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppoitmentDTO';
import IFindAllInMonthDTO from './dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from './dtos/IFindAllInDayDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAllInMonthFromProvider(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
