import CheckAuth from './check-auth';
import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken');

describe('Check Auth Use Case', () => {
  it('should verify a token', () => {
    jwt.verify.mockReturnValue({});
    const token = 'xyz';
    const secret = 'secret';
    process.env.JWT_SECRET = secret;
    const checkAuth = new CheckAuth({ allowedGroups: [] });

    checkAuth.execute({ token });

    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
  });

  it('should return true if a user is in the allowed groups', () => {
    const allowedGroups = ['theGroup'];
    jwt.verify.mockReturnValue({ groups: ['theGroup'] });
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(true);
  });

  it('should return false if a user in not in the allowed groups', () => {
    const allowedGroups = ['theGroup'];
    jwt.verify.mockReturnValue({ groups: ['otherGroup'] });
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('a user can have more than one group', () => {
    const allowedGroups = ['firstGroup'];
    jwt.verify.mockReturnValue({ groups: ['firstGroup', 'secondGroup'] });
    const checkAuth = new CheckAuth({ allowedGroups, jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(true);
  });

  it('should return false if verified token is null', () => {
    jwt.verify.mockReturnValue(null);
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('should return false if verified token does not contain groups', () => {
    jwt.verify.mockReturnValue({});
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'xyz' });

    expect(result).toBe(false);
  });

  it('should return false if token verification fails', () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('NO!');
    });
    const checkAuth = new CheckAuth({ allowedGroups: [], jwt });

    const result = checkAuth.execute({ token: 'WRONG' });

    expect(result).toBe(false);
  });
});
