import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { randomUUID } from 'crypto';
import { MuscleGroup } from '../../entities/muscle-group/muscle-group.entity';

export class MuscleGroupSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const date = new Date();
    const muscleGroupList = await em.upsertMany(
      MuscleGroup,
      [
        {
          id: randomUUID(),
          code: 'CH',
          description: 'Peito',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'TR',
          description: 'Tríceps',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'BI',
          description: 'Bíceps',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'BK',
          description: 'Costas',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'SH',
          description: 'Ombros',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'LG',
          description: 'Pernas',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'AB',
          description: 'Abdômen',
          createdAt: date,
          updatedAt: date,
        },
      ],

      {
        onConflictFields: ['code'],
        onConflictExcludeFields: ['id'],
      },
    );

    context.MuscleGroupList = muscleGroupList;
  }
}
