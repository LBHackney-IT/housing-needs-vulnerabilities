import { endpoint } from './index';
import createMockResponse from 'lib/api/utils/createMockResponse';

describe('Find Resources API', () => {
  const resources = [];

  const findResources = {
    execute: jest.fn(() => Promise.resolve(resources))
  };

  const call = async ({ body, headers, method }) => {
    const response = createMockResponse();

    await endpoint({ findResources })(
      {
        body,
        headers,
        method
      },
      response
    );

    return response;
  };

  it('returns a 200 with list of resources', async () => {
    const response = await call({ method: 'GET' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(resources));
  });

  it('does not accept non-GET requests', async () => {
    const response = await call({ method: 'POST' });
    expect(response.statusCode).toBe(405);
  });

  it('returns a 500 for other errors', async () => {
    findResources.execute = jest.fn(() => {
      throw new Error();
    });

    const response = await call({ method: 'GET' });
    expect(response.statusCode).toBe(500);
  });
});
