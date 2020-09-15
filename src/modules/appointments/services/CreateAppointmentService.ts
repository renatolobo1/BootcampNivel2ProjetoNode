import { startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import AppError from '@shared/errors/AppError';


import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;

  date: Date;
}

class CreateAppointmentService {
  public async execute({date,provider_id}: RequestDTO): Promise<Appointment>{
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate){
      throw new AppError('This appointment is already booked');
    }

  const appointment = appointmentRepository.create({
    date: appointmentDate,
    provider_id,
});

  await appointmentRepository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;
