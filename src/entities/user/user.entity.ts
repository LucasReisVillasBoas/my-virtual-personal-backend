import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserRepository } from '../../user/user.repository';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { Goals } from '../goals/goals.entity';
import { Gender } from '../gender/gender.entity';
import { Restriction } from '../restriction/restriction.entity';
import { Training } from '../training/training.entity';

@Entity({ repository: () => UserRepository })
export class User extends DeafultEntity {
  [EntityRepositoryType]?: UserRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  fullName!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  email!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: true })
  nickname: string;

  @Exclude()
  @ApiProperty()
  @Property()
  password!: string;

  @Expose()
  @ApiProperty()
  @Property()
  age: string;

  @Expose()
  @ApiProperty()
  @Property()
  height: string;

  @Expose()
  @ApiProperty()
  @Property()
  weight: string;

  @Expose()
  @ApiProperty()
  @Type(() => Gender)
  @ManyToOne({ index: true })
  gender: Gender;

  @Expose()
  @ApiProperty()
  @Type(() => Restriction)
  @ManyToOne({ index: true, nullable: true })
  restriction: Restriction;

  @Expose()
  @ApiProperty({ type: () => Goals, isArray: true })
  @Type(() => Goals)
  @OneToMany(() => Goals, (item) => item.user)
  goalsList?: Goals[];

  @Expose()
  @ApiProperty({ type: () => Training, isArray: true })
  @Type(() => Training)
  @OneToMany(() => Training, (item) => item.user)
  trainingList?: Training[];
}
