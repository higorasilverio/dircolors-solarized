import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Lead extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  fullName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  city: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  state: string;

  @Column({ nullable: false, default: true })
  optIn: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
