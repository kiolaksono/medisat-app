import { hashSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};

export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return compareSync(password, hashedPassword);
};
