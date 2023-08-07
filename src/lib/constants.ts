const USER_TOKEN: string | undefined = process.env.USER_TOKEN!;

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return JWT_SECRET_KEY;
}

export function getUserToken(): string {
  if (!USER_TOKEN || USER_TOKEN.length === 0) {
    throw new Error("The environment variable USER_TOKEN is not set.");
  }

  return USER_TOKEN;
}
