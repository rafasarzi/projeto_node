import { request, response, Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";


import AppointmentRepository from "../repositories/ApointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async(request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) =>{
  try{
    const {  date, provider_id } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);

  } catch (err) {let errorMessage = 'falha';
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  return response.status(400).json({ error: errorMessage});
}
});

export default appointmentsRouter;

