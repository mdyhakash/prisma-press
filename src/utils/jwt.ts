import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};

const verifyToken = (token: string, secret: string) => {
  try {
    const verfiedToken = jwt.verify(token, secret);
    return verfiedToken;
  } catch (error) {
    throw new Error("Invalid signature");
  }
};
export const jwtUtils = {
  createToken,
  verifyToken,
};
