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
