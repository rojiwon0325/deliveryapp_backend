import { IsDate, IsNumber } from 'class-validator';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;
}
