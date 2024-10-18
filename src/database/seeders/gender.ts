import { Gender } from '../../entities/gender/gender.entity';
import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { randomUUID } from 'crypto';

export class GenderSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const date = new Date();
    const genderList = await em.upsertMany(
      Gender,
      [
        {
          id: randomUUID(),
          code: 'MM',
          description: 'Masculino',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'FF',
          description: 'Feminino',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'OO',
          description: 'Outros',
          createdAt: date,
          updatedAt: date,
        },
      ],
      {
        onConflictFields: ['code'],
        onConflictExcludeFields: ['id'],
      },
    );

    context.genderList = genderList;
  }
}
