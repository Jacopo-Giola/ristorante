import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sezione } from './Sezione';
import { User } from './User';

@Entity()
export class Piatto {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255 })
  descrizione!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prezzo!: number;

  @ManyToOne(() => Sezione, sezione => sezione.piatti)
  sezione!: Sezione;

  @ManyToOne(() => User, user => user.piatti)
  user!: User;
}