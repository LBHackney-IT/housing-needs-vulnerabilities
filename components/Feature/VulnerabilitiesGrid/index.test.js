import { fireEvent, render } from '@testing-library/react';
import VulnerabilitiesGrid from './index';
import groups from './grid.json';
import { act } from 'react-dom/test-utils';

describe('VulnerabilitiesGrid', () => {
  const resources = [];

  it('renders the vulnerabilities grid', () => {
    const numberOfGroups = groups.length;
    const totalAssets = groups.reduce((total, g) => {
      return total + g.assets.length;
    }, 0);
    const totalVulnerabilities = groups.reduce((total, g) => {
      return total + g.vulnerabilities.length;
    }, 0);

    const { container } = render(
      <VulnerabilitiesGrid onUpdate={jest.fn()} resources={resources} />
    );

    expect(
      container.querySelectorAll('.govuk-accordion__section').length
    ).toEqual(numberOfGroups);
    expect(
      container.querySelectorAll('.govuk-checkboxes__item').length
    ).toEqual(totalAssets + totalVulnerabilities);
  });

  it('updates the grid state when a vulnerability is checked', async () => {
    const onUpdate = jest.fn();
    const expected = expect.objectContaining({
      assets: [],
      vulnerabilities: [expect.any(String)]
    });

    const { container } = render(
      <VulnerabilitiesGrid onUpdate={onUpdate} resources={resources} />
    );

    act(() => container.querySelector('.govuk-checkboxes__input').click());
    expect(onUpdate).toHaveBeenCalledWith(expected);
  });

  it('creates a textinput when checkbox is checked', () => {
    const { container } = render(
      <VulnerabilitiesGrid onUpdate={jest.fn()} resources={resources} />
    );

    fireEvent(
      container.querySelector('#financial-stability-a-other'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(
      container.querySelector('#financial-stability-a-other--i')
    ).toBeInTheDocument();
  });

  it('saves "Other" assets', () => {
    const onUpdate = jest.fn();
    const expected = expect.objectContaining({
      assets: ['some text'],
      vulnerabilities: []
    });
    const { container } = render(
      <VulnerabilitiesGrid onUpdate={onUpdate} resources={resources} />
    );

    fireEvent(
      container.querySelector('#financial-stability-a-other'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    fireEvent.change(
      container.querySelector('#financial-stability-a-other--i'),
      {
        target: { value: 'some text' }
      }
    );

    expect(onUpdate).toHaveBeenCalledWith(expected);
  });

  it('saves "Other" vulnerabilities', () => {
    const onUpdate = jest.fn();
    const expected = expect.objectContaining({
      assets: [],
      vulnerabilities: ['some text']
    });
    const { container } = render(
      <VulnerabilitiesGrid onUpdate={onUpdate} resources={resources} />
    );

    fireEvent(
      container.querySelector('#financial-stability-v-other'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    fireEvent.change(
      container.querySelector('#financial-stability-v-other--i'),
      {
        target: { value: 'some text' }
      }
    );

    expect(onUpdate).toHaveBeenCalledWith(expected);
  });

  describe('resources', () => {
    it('shows links to resources tagged with current selections', () => {
      const resources = [
        {
          id: 'hq',
          name: 'Hackney Quest',
          description:
            'We provide mentoring for young people and families over the phone or by video call.',
          websites: [
            'https://twitter.com/HackneyQuest',
            'http://www.hackneyquest.org.uk/'
          ],
          address: '1 Poole Rd, London E9 7AE',
          tags: ['Social isolation']
        }
      ];

      const { getByLabelText, queryByTestId } = render(
        <VulnerabilitiesGrid onUpdate={jest.fn()} resources={resources} />
      );

      expect(queryByTestId('resource-hq')).not.toBeInTheDocument();

      act(() => getByLabelText('Social isolation').click());
      expect(queryByTestId('resource-hq')).toBeInTheDocument();
    });
  });

  it('shows links to resources tagged with current group', () => {
    const resources = [
      {
        id: 'hs',
        name: 'Hackney Shine',
        description:
          'We offer free online and over the phone advice service to ...',
        websites: ['https://hackney.gov.uk/shine'],
        tags: ['Financial stability']
      }
    ];

    const { getByLabelText, queryByTestId } = render(
      <VulnerabilitiesGrid onUpdate={jest.fn()} resources={resources} />
    );

    expect(queryByTestId('resource-hs')).not.toBeInTheDocument();

    act(() => getByLabelText('Rent arrears').click());
    expect(queryByTestId('resource-hs')).toBeInTheDocument();
  });
});
