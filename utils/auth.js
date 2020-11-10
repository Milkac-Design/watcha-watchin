import { getSessionByToken } from './database';

export async function isSessionTokenValid(token) {
  if (token === 'undefined') {
    return false;
  }

  const session = await getSessionByToken(token);

  if (session === undefined) {
    return false;
  }

  if (session.expiry < new Date()) {
    return false;
  }

  return true;
}
