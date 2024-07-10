import jwt from 'jsonwebtoken';
import * as fs from 'fs'

const secret_key = 'danman203';

export const generateTokenUser = (id) => {
  const payload = {
    user_id: id,
    role: 'user'
  }
  const options = {
    expiresIn: '2h',
  };
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export const generateTokenCompany = (id) => {
  const payload = {
    company_id: id,
    role: 'company'
  }
  const options = {
    expiresIn: '2h',
  };
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export const verifyUser = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).json({ error: 'No token' });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    if (decoded.role !== 'user') {
      return response.status(403).json({ error: "Not authorized" });
    }
    request.user = decoded;
    next();
  }
  catch (error) {
    console.error('Error:', error);
    return response.status(401).json({ error: 'error' });
  }
}

export const verifyCompany = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).json({ error: 'No token' });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    if (decoded.role !== 'company') {
      return response.status(403).json({ error: "Not authorized" });
    }
    request.user = decoded;
    next();
  }
  catch (error) {
    console.error('Error:', error);
    return response.status(401).json({ error: 'error' });
  }
}


export const logging = (request, response, next) => {
  const info = `Url: ${request.url},
                Method: ${request.method}`
  fs.appendFileSync("./server.log", `${info}\n\n`)
  next()
}

