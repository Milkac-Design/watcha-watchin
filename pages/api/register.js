import argon2 from 'argon2';
import Tokens from 'csrf';
import { getUserByUsername, registerUser } from '../../utils/database';

const tokens = new Tokens();

export default async function handler(req, res) {
  const { username, password, token } = req.body;

  const secret = process.env.CSRF_TOKEN_SECRET;

  if (secret === 'undefined') {
    res.status(500).send({ success: false });
    throw new Error('CSRF_TOKEN_SECRET variable not configured');
  }

  const verified = tokens.verify(secret, token);

  if (!verified) {
    return res.status(401).send({ success: false });
  }
  const user = await getUserByUsername(username);
  console.log(user);
  if (user) {
    return res.status(403).send({ success: false });
  }
  try {
    const passwordHash = await argon2.hash(password);
    await registerUser(username, passwordHash);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}
