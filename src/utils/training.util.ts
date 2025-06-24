import { Training } from 'src/entities/training/training.entity';

export function filterTrainingFields(training: Training) {
  return {
    id: training.id,
    active: training.active,
    trainingType: {
      id: training.trainingType.id,
      code: training.trainingType.code,
      description: training.trainingType.description,
    },
    goals: {
      id: training.goals.id,
      code: training.goals.code,
      description: training.goals.description,
      active: training.goals.active,
    },
    user: {
        id: training.user.id,
        fullName: training.user.fullName,
        email: training.user.email,
        age: training.user.age,
        height: training.user.height,
        weight: training.user.weight,
        gender: training.user.gender.id,
        restriction: training.user.restriction.id,
        role: training.user.role,
    },
    trainingExerciseList: training.trainingExerciseList
  };
}
