import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { User } from '../user/user.entity';
import { GoalsRepository } from '../../goals/goals.repository';
import { Training } from '../training/training.entity';

@Entity({ repository: () => GoalsRepository })
export class Goals extends DeafultEntity {
  [EntityRepositoryType]?: GoalsRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  code: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  description: string;

  @Expose()
  @ApiProperty()
  @Property()
  active: boolean;

  @Expose({ toClassOnly: true })
  @Type(() => User)
  @ManyToOne({ entity: () => User, index: true, nullable: true })
  user: User;

  @Expose()
  @ApiProperty({ type: () => Training, isArray: true })
  @Type(() => Training)
  @OneToMany(() => Training, (item) => item.goals)
  trainingList?: Training[];
}
