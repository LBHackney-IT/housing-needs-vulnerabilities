import { endpoint } from './index';
import createMockResponse from 'lib/api/utils/createMockResponse';

describe('Get Snapshot Api', () => {
  const id = '1';
  const getSnapshot = { execute: jest.fn(() => ({ id })) };
  const call = async ({ method, params }) => {
    const response = createMockResponse();
    await endpoint({ getSnapshot })(
      {
        method: method || 'GET',
        query: params
      },
      response
    );
    return response;
  };

  it('can get a snapshot', async () => {
    const response = await call({ params: { id } });
    expect(getSnapshot.execute).toHaveBeenCalledWith({ id });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify({ id }));
  });

  it('does not accept non-GET requests', async () => {
    const response = await call({ method: 'POST' });
    expect(response.statusCode).toBe(405);
  });

  it('returns 400 when no id', async () => {
    const response = await call({
      params: {}
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).errors.length).toBe(1);
  });

  it('returns a 500 for other errors', async () => {
    getSnapshot.execute = jest.fn(() => {
      throw new Error();
    });
    const response = await call({
      params: { id }
    });
    expect(response.statusCode).toBe(500);
  });
});
