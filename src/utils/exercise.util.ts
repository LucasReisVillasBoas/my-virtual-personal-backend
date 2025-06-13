import { ExerciseResponseDto } from 'src/exercise/dto/exercise-response.dto';

export function generateCode(
  muscleGroupPrefix: string,
  exerciseType: 'M' | 'H' | 'B' | 'C' | 'F',
  muscleGroup: ExerciseResponseDto[],
): string {
  const muscleGroupExercisesFiltered = muscleGroup.filter(
    (exercise) => exercise.code.startsWith(muscleGroupPrefix),
  );

  const lastExercise = muscleGroupExercisesFiltered[muscleGroupExercisesFiltered.length - 1];

  const lastCode = lastExercise.code.split('-')[1];
  const lastNumber = parseInt(lastCode.substring(1), 10);
  const nextNumber = lastNumber + 1;
  const nextCode = `${muscleGroupPrefix}-${exerciseType}${nextNumber.toString().padStart(2, '0')}`;

  return nextCode;
}
