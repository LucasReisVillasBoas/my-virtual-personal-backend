import { MAX_HEIGTH, MAX_WEIGHT, MIN_HEIGTH, MIN_WEIGHT } from '../settings';

export function validateWeight(weight: string): boolean {
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum)) {
    return false;
  }
  return weightNum >= MIN_WEIGHT && weightNum <= MAX_WEIGHT;
}

export function validateHeight(height: string): boolean {
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) {
    return false;
  }
  return heightNum >= MIN_HEIGTH && heightNum <= MAX_HEIGTH;
}

export function validateAge(userAge: string): boolean {
  const age = Number(userAge);
  if (isNaN(age) || age > 99 || age < 13) {
    return false;
  }
  return true;
}
