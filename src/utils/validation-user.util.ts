export function validateWeight(weight: string): boolean {
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum)) {
    return false;
  }
  return weightNum >= 1 && weightNum <= 999;
}

export function validateHeight(height: string): boolean {
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) {
    return false;
  }
  return heightNum >= 50 && heightNum <= 250;
}

export function validateAge(userAge: string): boolean {
  const age = Number(userAge);
  if (isNaN(age) || age > 99 || age < 13) {
    return false;
  }
  return true;
}
