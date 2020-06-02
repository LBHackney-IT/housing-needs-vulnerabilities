import logger from 'lib/infrastructure/logging/logger';
import { HttpStatusError } from './HttpStatusError';

async function request(path, { token, ...options }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  logger.info(`Fetching ${url}`, options?.body);
  const response = await fetch(url, {
    ...options,
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
      authorization: token ? `Bearer ${token}` : undefined,
      'content-type': 'application/json',
    },
    body: options?.body ? JSON.stringify(options.body) : null,
  });

  if (response.ok) {
    return response.json();
  } else {
    logger.error(`Fetching ${url} failed`, response.status);
    throw new HttpStatusError(response.status);
  }
}
