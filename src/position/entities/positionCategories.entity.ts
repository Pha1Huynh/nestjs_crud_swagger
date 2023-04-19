import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Position } from './position.entity';
@Entity()
export class PositionCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Column()
  level: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Position)
  @JoinColumn({ name: 'positionId' })
  position: Position;
}
