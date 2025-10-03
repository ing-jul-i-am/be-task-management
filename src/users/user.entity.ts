import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ })
  username: string;

  @Column({ })
  email: string;

  @Column({ })
  password: string;

  @Column({ nullable: true })
  role: string; // 'admin' o 'worker'

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}