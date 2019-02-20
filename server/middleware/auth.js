import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function auth(req, res, next) {
  const token = req.header('x-http-token');
  if (!token) {
    return res.status(401).send({
      status: 401,
      error: 'Access denied',
      token,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send({
      status: 400,
      error: 'invalid token',
    });
  }
}

export default auth;
