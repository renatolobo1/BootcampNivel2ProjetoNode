import Appointment from '../models/Appointment';
import { startOfHour} from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;

  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository:AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository){
    this.appointmentRepository = appointmentRepository;
  }

  public execute({date,provider}: RequestDTO): Appointment{
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate){
      throw Error('This appointment is already booked')
    }

  const appointment = this.appointmentRepository.create({
    date: appointmentDate,
    provider,
});

    return appointment;
  }

}

export default CreateAppointmentService;
