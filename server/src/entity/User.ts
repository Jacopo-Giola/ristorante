import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sezione } from './Sezione'
import { Piatto } from './Piatto';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @OneToMany(() => Sezione, sezione => sezione.user)
  sezioni!: Sezione[];

  @OneToMany(() => Piatto, piatto => piatto.user)
  piatti!: Piatto[];
}