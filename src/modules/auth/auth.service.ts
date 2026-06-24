import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });
  const ispasswordMatched = await bcrypt.compare(password, user.password);

  if (!ispasswordMatched) {
    throw new Error("Password is incorrect");
  }
  return user;
};

export const authService = {
  loginUser,
};
