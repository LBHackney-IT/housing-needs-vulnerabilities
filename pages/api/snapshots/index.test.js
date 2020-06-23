import { endpoint } from './index';
import createMockResponse from 'lib/api/utils/createMockResponse';

describe('Create Snapshot Api', () => {
  const createSnapshot = { execute: jest.fn() };
  const call = async ({ body, headers, method }) => {
    const response = createMockResponse();

    await endpoint({ createSnapshot })(
      {
        body,
        headers,
        method: method || 'POST'
      },
      response
    );

    return response;
  };

  it('can create a snapshot', async () => {
    const dob = {};
    const firstName = 'sue';
    const lastName = 'taylor';
    const systemIds = ['xyz'];
    const response = await call({
      body: { dob, firstName, lastName, systemIds },
      headers: {}
    });
    expect(createSnapshot.execute).toHaveBeenCalledWith({
      dob,
      createdBy: '',
      firstName,
      lastName,
      systemIds
    });
    expect(response.statusCode).toBe(201);
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
