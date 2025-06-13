import { GoalsResponseDto } from 'src/goals/dto/goals-response.dto';

export const generateGoalsCode = (
  restrictionType: string,
  existingCodes: GoalsResponseDto[],
): string => {
  const filteredCodes = existingCodes.filter((code) =>
    code.code.startsWith(restrictionType),
  );

  if (filteredCodes.length === 0) {
    return `${restrictionType}-01`;
  }

  const lastRestriction = filteredCodes[filteredCodes.length - 1];

  const lastCode = lastRestriction.code.split('-')[1];
  const lastNumber = parseInt(lastCode.substring(1), 10);
  const nextNumber = lastNumber + 1;
  const nextCode = `${restrictionType}-${nextNumber.toString().padStart(2, '0')}`;
  return nextCode;
};
