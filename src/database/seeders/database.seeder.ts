import { Seeder } from '@mikro-orm/seeder';
import { GenderSeeder } from './gender';
import { EntityManager } from '@mikro-orm/core';
import { TrainingTypeSeeder } from './training-type';
import { MuscleGroupSeeder } from './muscle-group';
import { ExerciseSeeder } from './exercise';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [
      GenderSeeder,
      TrainingTypeSeeder,
      MuscleGroupSeeder,
      ExerciseSeeder,
    ]);
  }
}
