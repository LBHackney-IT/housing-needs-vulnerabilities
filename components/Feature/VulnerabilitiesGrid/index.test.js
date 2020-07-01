import { fireEvent, render } from '@testing-library/react';
import VulnerabilitiesGrid from './index';
import groups from './grid.json';

describe('VulnerabilitiesGrid', () => {
  it('renders the vulnerabilities grid', () => {
    const numberOfGroups = groups.length;
    const totalAssets = groups.reduce((total, g) => {
      return total + g.assets.length;
    }, 0);
    const totalVulnerabilities = groups.reduce((total, g) => {
      return total + g.vulnerabilities.length;
    }, 0);

    const { container } = render(<VulnerabilitiesGrid />);

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
      vulnerabilities: [{ name: 'Rent arrears', data: {} }]
    });

    const { container } = render(<VulnerabilitiesGrid onUpdate={onUpdate} />);
    await container.querySelector('.govuk-checkboxes__input').click();

    expect(onUpdate).toHaveBeenCalledWith(expected);
  });

  it('creates a textinput when checkbox is checked', () => {
    const { container } = render(<VulnerabilitiesGrid onUpdate={() => {}} />);

    fireEvent(
      container.querySelector('#financial-stability-a-other'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(
      container.querySelector('#financial-stability-a-other-other-i')
    ).toBeInTheDocument();
  });

  it('saves "Other" assets', () => {
    const onUpdate = jest.fn();
    const expected = expect.objectContaining({
      assets: [{ name: 'Other', data: { Other: 'some text' } }],
      vulnerabilities: []
    });
    const { container } = render(<VulnerabilitiesGrid onUpdate={onUpdate} />);

    fireEvent(
      container.querySelector('#financial-stability-a-other'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    fireEvent.change(
      container.querySelector('#financial-stability-a-other-other-i'),
      {
        target: { value: 'some text' }
      }
    );

    expect(onUpdate).toHaveBeenCalledWith(expected);
  });

  it('saves "Other" vulnerabilities', () => {
    const onUpdate = jest.fn();
    const expected = {
      assets: [],
      vulnerabilities: [{ name: 'Other', data: { Other: 'some text' } }]
    };
    const { container } = render(<VulnerabilitiesGrid onUpdate={onUpdate} />);

    fireEvent(
      container.querySelector('#financial-stability-v-other'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    fireEvent.change(
      container.querySelector('#financial-stability-v-other-other-i'),
      {
        target: { value: 'some text' }
      }
    );

    expect(onUpdate).toHaveBeenCalledWith(expected);
  });
});
