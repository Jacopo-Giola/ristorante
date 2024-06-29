import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Piatto } from './Piatto';

@Entity()
export class Sezione {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @ManyToOne(() => User, user => user.sezioni)
  user!: User;

  @OneToMany(() => Piatto, piatto => piatto.sezione)
  piatti!: Piatto[];
}