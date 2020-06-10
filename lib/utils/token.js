import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const getToken = req => {
  if (!req || !req.headers || !req.headers.cookie) return '';
  const cookies = cookie.parse(req.headers.cookie);
  if (cookies.hackneyToken) return cookies.hackneyToken;
  return '';
};

const getUsername = token => {
  if (!token) return '';
  const decoded = jwt.decode(token);
  return decoded ? decoded.name : '';
};

export { getToken, getUsername };
