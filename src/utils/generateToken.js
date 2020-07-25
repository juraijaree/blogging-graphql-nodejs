import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecret';

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7 days' });
}

export default generateToken;
