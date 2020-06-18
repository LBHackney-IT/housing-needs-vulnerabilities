import { enableFetchMocks } from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import SnapshotSummary from 'pages/snapshots/[id]';

describe('SnapshotSummary', () => {
  const expectedResponse = {
    id: '1',
    firstName: 'Wayne',
    lastName: 'Rooney',
    vulnerabilities: [],
    assets: [],
    notes: ''
  };

  beforeEach(() => {
    enableFetchMocks();
    fetch.mockResponse(JSON.stringify(expectedResponse));
  });

  it('fetches snapshot from the correct url and sets props', async () => {
    const props = await SnapshotSummary.getInitialProps({ query: { id: '1' } });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/snapshots/1'),
      expect.any(Object)
    );
    expect(props.initialSnapshot).toStrictEqual(expectedResponse);
  });

  describe('adding a snapshot', () => {
    it('shows the name', () => {
      const snapshot = {
        firstName: 'John',
        lastName: 'Wick'
      };
      const { getByText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(
        getByText(`${snapshot.firstName} ${snapshot.lastName}`)
      ).toBeInTheDocument();
    });

    it('shows the vulnerabilities grid', () => {
      const { container } = render(<SnapshotSummary initialSnapshot={{}} />);
      expect(container.querySelector('.govuk-accordion')).toBeInTheDocument();
    });

    it('shows the notes', () => {
      const { getByLabelText } = render(
        <SnapshotSummary initialSnapshot={{}} />
      );
      expect(
        getByLabelText(`Any other notes you'd like to add?`)
      ).toBeInTheDocument();
    });
  });
});
