export function mapMuscleGroup(muscleGroup: string): string {
  switch (muscleGroup) {
    case 'Peito':
      return 'chest';
    case 'Ombros':
      return 'shoulders';
    case 'Tríceps':
      return 'triceps';
    case 'Bíceps':
      return 'biceps';
    case 'Costas':
      return 'back';
    case 'Quadríceps':
      return 'quadriceps';
    case 'Posterior de Coxa':
      return 'posterior';
    case 'Glúteos':
      return 'gluteal';
    case 'Panturrilha':
      return 'calf';
    case 'Abdômen':
      return 'abs';
    default:
      return 'muscle-group-not-found';
  }
}