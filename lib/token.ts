import { decode, encode } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;
const getJwtSecretKey = () => {
  if (!secret || secret.length === 0) {
    throw new Error('The environment variable JWT_SECRET is not set.');
  }
  return secret;
};

export async function verifyToken(token: string) {
  try {
    const verified = await decode({ token, secret: getJwtSecretKey() });
    return verified;
  } catch (error) {
    throw new Error('Your token is expired');
  }
}

export async function generateToken(token: any) {
  try {
    const verified = await encode({
      token,
      secret: getJwtSecretKey(),
    });
    return verified;
  } catch (error) {
    throw new Error('Your token is expired');
  }
}
