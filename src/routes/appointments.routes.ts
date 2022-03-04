import { request, response, Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";


import AppointmentRepository from "../repositories/ApointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

appointmentsRouter.get('/', async(request, response) =>{
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) =>{
  try{
    const {provider, date} = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService();

    const appointment = await CreateAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  }catch (err) {let errorMessage = 'falha';
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  return response.status(400).json({ error: errorMessage});
}
});

export default appointmentsRouter;

