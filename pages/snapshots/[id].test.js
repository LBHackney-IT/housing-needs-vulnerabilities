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
    const props = await SnapshotSummary.getInitialProps({
      query: { id: '1' },
      req: { headers: {} }
    });
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
        lastName: 'Wick',
        vulnerabilities: [],
        assets: []
      };
      const { getByText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(
        getByText(`${snapshot.firstName} ${snapshot.lastName}`)
      ).toBeInTheDocument();
    });

    it('shows the dob', () => {
      const d = new Date();
      const snapshot = {
        dob: d.setFullYear(d.getFullYear() - 45),
        vulnerabilities: [],
        assets: []
      };
      const { getByText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(getByText(/Aged 45/)).toBeInTheDocument();
    });

    it('shows the vulnerabilities grid', () => {
      const snapshot = {
        vulnerabilities: [],
        assets: []
      };
      const { container } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(container.querySelector('.govuk-accordion')).toBeInTheDocument();
    });

    it('shows the notes', () => {
      const snapshot = {
        vulnerabilities: [],
        assets: []
      };
      const { getByLabelText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(
        getByLabelText(`Any other notes you'd like to add?`)
      ).toBeInTheDocument();
    });

    it('hides the edit view if a vulnerability exists', () => {
      const snapshot = {
        vulnerabilities: ['v1'],
        assets: []
      };
      const { container, getByText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(
        container.querySelector('.govuk-accordion')
      ).not.toBeInTheDocument();
      expect(getByText('v1')).toBeInTheDocument();
    });

    it('hides the edit view if a asset exists', () => {
      const snapshot = {
        vulnerabilities: [],
        assets: ['a1']
      };
      const { container, getByText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(
        container.querySelector('.govuk-accordion')
      ).not.toBeInTheDocument();
      expect(getByText('a1')).toBeInTheDocument();
    });

    it('hides the edit view if notes exist', () => {
      const snapshot = {
        vulnerabilities: [],
        assets: [],
        notes: 'some notes'
      };
      const { container, getByText } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(
        container.querySelector('.govuk-accordion')
      ).not.toBeInTheDocument();
      expect(getByText('some notes')).toBeInTheDocument();
    });

    it('sends back to Singlewview when Back button is clicked', () => {
      const snapshot = {
        vulnerabilities: [],
        assets: [],
        systemIds: ['123']
      };
      const { container, getByTestId } = render(
        <SnapshotSummary initialSnapshot={snapshot} />
      );
      expect(getByTestId('back-link-test')).toHaveAttribute(
        'href',
        'https://staging-singleview.hackney.gov.uk/customers/123/view'
      );
    });
  });
});
