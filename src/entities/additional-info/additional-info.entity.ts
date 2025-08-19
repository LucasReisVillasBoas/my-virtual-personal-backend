import {
  Entity,
  Property,
  ManyToOne,
  Unique,
  Index,
  EntityRepositoryType,
  PrimaryKey,
} from '@mikro-orm/core';
import { DeafultEntity } from '../default.entity';
import { User } from '../user/user.entity';
import { AdditionalInfoRepository } from 'src/additional-info/additional-info.repository';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ repository: () => AdditionalInfoRepository })
export class AdditionalInfo extends DeafultEntity {
  [EntityRepositoryType]?: AdditionalInfoRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User)
  @Index()
  user!: User;

  @Property({ type: 'text[]', nullable: true })
  preExistingHealthConditions?: string[];

  @Property({ type: 'text[]', nullable: true })
  medicationUse?: string[];

  @Property({ nullable: true })
  timeTrainingWeightlifting?: string;

  @Property({ nullable: true })
  trainingFrequency?: string;

  @Property({ nullable: true })
  timeAvailabilityPerTraining?: string;

  @Property({ type: 'text[]', nullable: true })
  otherRegularPhysicalActivity?: string[];

  @Property({ nullable: true })
  likedDislikedExercises?: string;

  @Property({ type: 'text[]', nullable: true })
  muscleFocus?: string[];
}
