
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  provider: string | undefined;

  @Column('timestamps with time zone')
  date: Date | undefined;

}

export default Appointment
