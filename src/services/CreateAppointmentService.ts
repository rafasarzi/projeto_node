import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Appointment from "../models/Appointments";
import AppointmentsRepository from "../repositories/ApointmentsRepository";

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
      appointmentDate,
    );

    if(await findAppointmentInSameDate){
    throw Error('this appointment is alreaid booked');
    }

     const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    AppointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
