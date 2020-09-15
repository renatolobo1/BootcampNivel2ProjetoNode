import { startOfHour} from 'date-fns';
import {injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';


import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequestDTO {
  provider_id: string;

  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentsRepository,
    ){}

  public async execute({date,provider_id}: IRequestDTO): Promise<Appointment>{

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate){
      throw new AppError('This appointment is already booked');
    }

  const appointment = await this.appointmentRepository.create({
    date: appointmentDate,
    provider_id,
});

     return appointment;
  }

}

export default CreateAppointmentService;
