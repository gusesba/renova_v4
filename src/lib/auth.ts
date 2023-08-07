import { getJwtSecretKey, getUserToken } from "@/lib/constants";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";
import type { NextRequest, NextResponse } from "next/server";

export async function generateSHA256Hash(message: string) {
  // Converte a string em um ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Calcula o hash usando o algoritmo SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Converte o ArrayBuffer em uma string hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export async function verifySHA256Hash(message: string, hash: string) {
  // Gera o hash da mensagem novamente
  const generatedHash = await generateSHA256Hash(message);

  // Compara o hash gerado com o hash fornecido
  return generatedHash === hash;
}

export async function authenticate(user: string, password: string) {
  if (!process.env.USERNAME || !process.env.PASSWORD) return false;
  if (!(user === process.env.USERNAME)) return false;

  return verifySHA256Hash(password, process.env.PASSWORD);
}

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  let token = req.cookies.get(getUserToken())?.value;

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(res: NextResponse) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  res.cookies.set(getUserToken(), token, {
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });

  return res;
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(getUserToken(), "", { httpOnly: true, maxAge: 0 });
  return res;
}
