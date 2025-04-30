import * as dotenv from 'dotenv';

export function validateWeight(weight: string): boolean {
  dotenv.config();
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum)) {
    return false;
  }
  return (
    weightNum >= Number(process.env.MIN_WEIGHT) &&
    weightNum <= Number(process.env.MAX_WEIGHT)
  );
}

export function validateHeight(height: string): boolean {
  dotenv.config();
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) {
    return false;
  }
  return (
    heightNum >= Number(process.env.MIN_HEIGTH) &&
    heightNum <= Number(process.env.MAX_HEIGTH)
  );
}

export function validateAge(userAge: string): boolean {
  const age = Number(userAge);
  if (isNaN(age) || age > 99 || age < 13) {
    return false;
  }
  return true;
}
