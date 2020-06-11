import { endpoint } from './index';
import { createMockResponse } from 'lib/api/utils/createMockResponse';

describe('Create Snapshot api', () => {
  const createSnapshot = { execute: jest.fn() };
  const call = async ({ method, body }) => {
    const response = createMockResponse();
    await endpoint({ createSnapshot })(
      {
        method: method || 'POST',
        body
      },
      response
    );
    return response;
  };

  it('can create a snapshot', async () => {
    const firstName = 'sue';
    const lastName = 'taylor';
    const systemIds = ['xyz'];
    const response = await call({ body: { firstName, lastName, systemIds } });
    expect(createSnapshot.execute).toHaveBeenCalledWith({
      firstName,
      lastName,
      systemIds
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      JSON.stringify({
        firstName,
        lastName,
        systemIds
      })
    );
  });

  it('does not accept non-POST requests', async () => {
    const response = await call({ method: 'GET' });
    expect(response.statusCode).toBe(405);
  });

  describe('validation', () => {
    it('returns 400 when no firstName', async () => {
      const response = await call({
        body: {
          lastName: 'taylor',
          systemIds: ['xyz']
        }
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).errors.length).toBe(1);
    });

    it('returns 400 when no lastName', async () => {
      const response = await call({
        body: {
          firstName: 'sue',
          systemIds: ['xyz']
        }
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).errors.length).toBe(1);
    });

    it('returns 400 when no systemIds', async () => {
      const response = await call({
        body: {
          firstName: 'sue',
          lastName: 'taylor',
          systemIds: []
        }
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).errors.length).toBe(1);
    });
  });

  it('returns a 500 for other errors', async () => {
    createSnapshot.execute = jest.fn(() => {
      throw new Error();
    });
    const response = await call({
      body: {
        firstName: 'sue',
        lastName: 'taylor',
        systemIds: ['xyz']
      }
    });
    expect(response.statusCode).toBe(500);
  });
});
