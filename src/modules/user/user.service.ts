import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

const registerUserIntoDB = async (payload: any) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  //check user exists
  if (isUserExist) {
    throw new Error("User already exists");
  }

  //hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: { profilePhoto },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });
  return user;
};
export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
};
