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

export function mapMuscleGroupPrefix(muscleGroup: string): string {
  switch (muscleGroup) {
    case 'Peito':
      return 'CH';
    case 'Ombros':
      return 'SH';
    case 'Tríceps':
      return 'TR';
    case 'Bíceps':
      return 'BI';
    case 'Costas':
      return 'BK';
    case 'Quadríceps':
      return 'QU';
    case 'Posterior de Coxa':
      return 'PO';
    case 'Glúteos':
      return 'GL';
    case 'Panturrilha':
      return 'CA';
    case 'Abdômen':
      return 'AB';
    default:
      return '';
  }
}