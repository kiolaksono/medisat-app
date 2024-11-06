import { sign, verify } from "jsonwebtoken";
import * as jose from "jose";

export const signToken = (payload: { _id: string, role: string }) => {
  return sign(payload, process.env.JWT_SECMEDI as string);
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECMEDI as string);
};

export const verifyWithJose = async <T>(token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECMEDI);

  const { payload } = await jose.jwtVerify<T>(token, secret);
  return payload;
};
