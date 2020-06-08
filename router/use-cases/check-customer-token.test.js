import CheckCustomerToken from './check-customer-token';

describe('Check Customer Token', () => {
  it('returns true if customer token exists for the customer', async () => {
    const id = '1';
    const token = 'abc';
    const dbGateway = {
      get: jest.fn(() => ({
        customerTokens: [{ token: '123' }, { token }]
      }))
    };
    const checkCustomerToken = new CheckCustomerToken({ dbGateway });

    const result = await checkCustomerToken.execute({ id, token });

    expect(dbGateway.get).toHaveBeenCalledWith({ id });
    expect(result).toEqual(true);
  });

  it('returns false if customer token does not exist for the customer', async () => {
    const dbGateway = {
      get: jest.fn(() => ({
        customerTokens: []
      }))
    };
    const checkCustomerToken = new CheckCustomerToken({ dbGateway });

    const result = await checkCustomerToken.execute({ id: 1, token: 1 });

    expect(result).toEqual(false);
  });

  it('returns false if plan does not exist', async () => {
    const dbGateway = { get: jest.fn(() => null) };
    const checkCustomerToken = new CheckCustomerToken({ dbGateway });

    const result = await checkCustomerToken.execute({ id: 1, token: 1 });

    expect(result).toEqual(false);
  });

  it('returns false if token is missing', async () => {
    const checkCustomerToken = new CheckCustomerToken({ dbGateway: jest.fn() });

    const result = await checkCustomerToken.execute({ id: 1 });

    expect(result).toEqual(false);
  });

  it('returns false if id is missing', async () => {
    const checkCustomerToken = new CheckCustomerToken({ dbGateway: jest.fn() });

    const result = await checkCustomerToken.execute({ token: 1 });

    expect(result).toEqual(false);
  });
});
