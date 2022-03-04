import Appointment from '../models/Appointments';
import { EntityRepository, Repository} from 'typeorm';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{
  static save(appointment: Appointment & Appointment[]) {
    throw new Error("Method not implemented.");
  }
  public async findByDate(date: Date): Promise<Appointment | null> {
  const findAppointment = await this.findOne({
    where: {date},
});

      return findAppointment || null;
  }
}

export default AppointmentRepository;
