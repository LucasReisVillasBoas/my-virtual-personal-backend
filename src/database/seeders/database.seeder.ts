import { Seeder } from '@mikro-orm/seeder';
import { GenderSeeder } from './gender';
import type { EntityManager } from '@mikro-orm/core';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [GenderSeeder]);
  }
}
