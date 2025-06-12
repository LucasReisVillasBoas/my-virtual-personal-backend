import { mapMuscleGroup } from 'src/utils/muscle-group.util';
import { exercisesByest } from '../database/seeders/exercise-data';

export function generateCode(
  muscleGroup: string,
  exerciseType: 'M' | 'H' | 'B' | 'C' | 'F',
  description: string,
): string {
  const muscleGroupExercises = exercisesByest[mapMuscleGroup(muscleGroup)];
  if (!muscleGroupExercises || muscleGroupExercises.length === 0) {
    return `${muscleGroup.substring(0, 2).toUpperCase()}-${exerciseType}01`;
  }

  const lastExercise = muscleGroupExercises[muscleGroupExercises.length - 1];
  const lastCode = lastExercise.code.split('-')[1];
  const prefix = lastExercise.code.split('-')[0];
  const lastNumber = parseInt(lastCode.substring(1), 10);
  const nextNumber = lastNumber + 1;
  const nextCode = `${prefix}-${exerciseType}${nextNumber.toString().padStart(2, '0')}`;

  return nextCode;
}
