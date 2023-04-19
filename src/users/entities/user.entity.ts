import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { PositionCategories } from 'src/position/entities/positionCategories.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  emailAddress: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  userCode: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  imagePath: string;

  @Column()
  allowedLeaveDay: number;

  @Column()
  salary: number;

  @Column({ nullable: true })
  salaryAt: Date;

  @Column({ nullable: true })
  managerId: number;

  @Column()
  branch: number;

  @Column()
  level: number;

  @Column()
  sex: number;

  @Column({ nullable: true })
  morningStartAt: string;

  @Column({ nullable: true })
  morningEndAt: string;

  @Column({ nullable: true })
  morningWorking: number;

  @Column({ nullable: true })
  afternoonStartAt: string;

  @Column({ nullable: true })
  afternoonEndAt: string;

  @Column({ nullable: true })
  afternoonWorking: number;

  @Column({ nullable: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({ name: 'user_role' })
  role: Role[];

  @ManyToOne(() => Gender)
  @JoinColumn([{ name: 'sex' }])
  genderData: Gender;

  @ManyToOne(() => Branch)
  @JoinColumn([{ name: 'branch' }])
  branchData: Branch;

  @ManyToOne(() => PositionCategories)
  @JoinColumn({ name: 'level' })
  positionCategories: PositionCategories;
}
