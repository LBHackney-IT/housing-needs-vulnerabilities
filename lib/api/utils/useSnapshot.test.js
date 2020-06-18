import useSnapshot from './useSnapshot';
import { enableFetchMocks } from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';

describe('useSnapshot', () => {
  beforeAll(() => {
    enableFetchMocks();
  });

  const expectedSnapshot = {
    id: 'IRFaVaY2b',
    firstName: 'My',
    lastName: 'Snapshot'
  };

  beforeEach(() => {
    fetch.mockReset();
    fetch.mockResponse(JSON.stringify(expectedSnapshot));
  });

  it('fetches a snapshot', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSnapshot(expectedSnapshot.id)
    );

    await waitForNextUpdate();
    expect(result.current.snapshot).toStrictEqual(expectedSnapshot);
  });
});
