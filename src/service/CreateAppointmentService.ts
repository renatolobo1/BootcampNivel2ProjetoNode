import { startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;

  date: Date;
}

class CreateAppointmentService {
  public async execute({date,provider}: RequestDTO): Promise<Appointment>{
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate){
      throw Error('This appointment is already booked')
    }

  const appointment = appointmentRepository.create({
    date: appointmentDate,
    provider,
});

  await appointmentRepository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;
