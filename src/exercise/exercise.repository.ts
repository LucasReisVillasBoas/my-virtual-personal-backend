import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Exercise } from '../entities/exercise/exercise.entity';
import { ExerciseResponseDto } from './dto/exercise-response.dto';

export class ExerciseRepository extends PostgresEntityRepository<Exercise> {
  // custom methods
  async getAll(): Promise<ExerciseResponseDto[]> {
    const exercises = await this.findAll({
      exclude: ['createdAt', 'updatedAt'],
      populate: ['muscleGroup'],
    });

    return exercises.map((exercise) => ({
      id: exercise.id,
      code: exercise.code,
      description: exercise.description,
      muscleGroup: {
        id: exercise.muscleGroup.id,
        code: exercise.muscleGroup.code,
        description: exercise.muscleGroup.description,
      },
    }));
  }
}
