import bcrypt from "bcrypt";

// Encrypt pw
export const hashed = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

// Compare login pw with hashed pw
export const compareHash = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const compared = await bcrypt.compare(password, hashedPassword);
  return compared;
};
