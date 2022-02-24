
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './user'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string ;

  @Column()
  provider_id: string ;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamps with time zone')
  date: Date;

}

export default Appointment
