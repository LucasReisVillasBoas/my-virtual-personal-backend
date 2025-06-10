import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { UserRole } from '../user/user-role';
import { Expose, Type } from 'class-transformer';
import { ProfessionalsRepository } from '../../professionals/professionals.repository';
import { DeafultEntity } from '../default.entity';

@Entity({ repository: () => ProfessionalsRepository })
export class Professionals extends DeafultEntity {
  [EntityRepositoryType]?: ProfessionalsRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  name!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  email!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  @Enum(() => UserRole)
  type!: UserRole;

  @Expose()
  @ApiProperty({ type: () => User })
  @Type(() => User)
  @ManyToMany({
    entity: () => User,
    index: true,
    nullable: true,
    owner: true,
  })
  users? = new Collection<User>(this);
}
