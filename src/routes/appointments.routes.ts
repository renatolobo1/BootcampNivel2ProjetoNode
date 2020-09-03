import { Router} from 'express';
import {getCustomRepository} from 'typeorm';
import { parseISO} from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response)=>{
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response)=>{
  try {
    const {provider_id, date } = request.body;

    const parsedDate =  parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch(error) {
    return response.status(400).json({error: error.message});
  }

});

export default appointmentsRouter;
