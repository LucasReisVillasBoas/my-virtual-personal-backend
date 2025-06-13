import { RestrictionResponseDto } from 'src/restriction/dto/restriction-response.dto';

export const generateRestrictionCode = (
  restrictionType: string,
  existingCodes: RestrictionResponseDto[],
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
