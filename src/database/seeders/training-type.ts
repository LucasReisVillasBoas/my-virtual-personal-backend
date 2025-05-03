import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { randomUUID } from 'crypto';
import { TrainingType } from '../../entities/training/training-type.entity';

export class TrainingTypeSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const date = new Date();
    const trainingTypeList = await em.upsertMany(
      TrainingType,
      [
        {
          id: randomUUID(),
          code: 'ABC',
          description:
            'Treino em 3 partes: A (Peito, Tríceps, Ombros), B (Costas, Bíceps, Abdômen), C (Pernas)',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'ABCD',
          description:
            'Treino em 4 partes: A (Peito, Tríceps), B (Costas, Bíceps), C (Pernas), D (Ombros, Abdômen)',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'AB',
          description:
            'Treino em 2 partes: A (Peito, Tríceps, Ombros), B (Costas, Bíceps, Pernas)',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'A',
          description: 'Treino para um único grupo muscular',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'ABCDE',
          description:
            'Treino em 5 partes: A (Peito), B (Costas), C (Ombros), D (Pernas), E (Braços)',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'PPL',
          description:
            'Treino dividido em Push (Peito, Ombros, Tríceps), Pull (Costas, Bíceps), Legs (Pernas)',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'FB',
          description: 'Treino de corpo inteiro em uma única sessão',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'UL',
          description: 'Treino dividido em Parte Superior e Parte Inferior',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: randomUUID(),
          code: 'HYP',
          description:
            'Treino focado em hipertrofia para diferentes grupos musculares',
          createdAt: date,
          updatedAt: date,
        },
      ],
      {
        onConflictFields: ['code'],
        onConflictExcludeFields: ['id'],
      },
    );

    context.TrainingTypeList = trainingTypeList;
  }
}
