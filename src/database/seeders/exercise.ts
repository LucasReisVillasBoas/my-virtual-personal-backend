import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { Exercise } from '../../entities/exercise/exercise.entity';
import { MuscleGroup } from '../../entities/muscle-group/muscle-group.entity';
import { exercisesByest } from './exercise-data';

export class ExerciseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const date = new Date();

    const muscleGroups = await em.find(MuscleGroup, {});

    const chestGroup = muscleGroups.find(
      (group) => group.description === 'Peito',
    );
    const shoulderGroup = muscleGroups.find(
      (group) => group.description === 'Ombros',
    );
    const bicepsGroup = muscleGroups.find(
      (group) => group.description === 'Bíceps',
    );
    const tricepsGroup = muscleGroups.find(
      (group) => group.description === 'Tríceps',
    );
    const backGroup = muscleGroups.find(
      (group) => group.description === 'Costas',
    );
    const legsGroup = muscleGroups.find(
      (group) => group.description === 'Pernas',
    );
    const absGroup = muscleGroups.find(
      (group) => group.description === 'Abdômen',
    );

    const muscleGroupMap = {
      chest: chestGroup,
      shoulders: shoulderGroup,
      biceps: bicepsGroup,
      triceps: tricepsGroup,
      back: backGroup,
      legs: legsGroup,
      abs: absGroup,
    };

    const persistExercises = async (groupKey: keyof typeof exercisesByest) => {
      const group = muscleGroupMap[groupKey];
      const exercisesData = exercisesByest[groupKey];

      const exercises = exercisesData.map(({ code, description }) => {
        return em.create(Exercise, {
          id: randomUUID(),
          code,
          description,
          createdAt: date,
          updatedAt: date,
          muscleGroup: group,
        });
      });

      await em.persistAndFlush(exercises);
    };

    // Persiste os exercícios de cada grupo muscular
    await persistExercises('chest');
    await persistExercises('shoulders');
    await persistExercises('biceps');
    await persistExercises('triceps');
    await persistExercises('back');
    await persistExercises('legs');
    await persistExercises('abs');
  }
}
