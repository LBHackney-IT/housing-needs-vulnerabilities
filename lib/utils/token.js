import cookies from 'cookie';
import jwt from 'jsonwebtoken';

const getTokenFromCookieHeader = ({ cookie }) => {
  if (!cookie) return '';
  return cookies.parse(cookie).hackneyToken || '';
};

const getTokenFromAuthHeader = ({ authorization }) => {
  if (!authorization) return '';
  return authorization.replace('Bearer ', '');
};

const getUsername = token => {
  if (!token) return '';
  const decoded = jwt.decode(token);
  return decoded ? decoded.name : '';
};

export { getTokenFromAuthHeader, getTokenFromCookieHeader, getUsername };
