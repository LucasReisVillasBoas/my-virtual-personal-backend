// src/entities/User.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRepository } from 'src/user/user.repository';

@Entity({ repository: () => UserRepository })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;
}
