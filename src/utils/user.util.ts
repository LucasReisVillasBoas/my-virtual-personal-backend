import { UserRole } from '../entities/user/user-role';
import { User } from '../entities/user/user.entity';
import { UserResponseData } from '../user/dto/user-register-response.dto';

export function filterUserFields(
  user: User,
  fieldsToRemove: Array<keyof User>,
): UserResponseData {
  const filteredUser: Partial<UserResponseData> = { ...user };

  fieldsToRemove.forEach((field) => {
    delete filteredUser[field];
  });

  return {
    id: filteredUser.id!,
    fullName: filteredUser.fullName!,
    nickname: filteredUser.nickname,
    age: filteredUser.age!,
    height: filteredUser.height!,
    weight: filteredUser.weight!,
    email: filteredUser.email!,
  };
}

export function mapUserRole(userRole: string): UserRole {
  const mapped: Record<string, UserRole> = {
    personal_trainer: UserRole.PERSONAL_TRAINER,
    user: UserRole.USER,
    nutritionist: UserRole.NUTRITIONIST,
    gym: UserRole.GYM,
  };

  return mapped[userRole] || UserRole.USER;
}
