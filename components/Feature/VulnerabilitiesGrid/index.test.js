import { render } from '@testing-library/react';
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
      vulnerabilities: [expect.any(String)]
    });

    const { container } = render(<VulnerabilitiesGrid onUpdate={onUpdate} />);
    await container.querySelector('.govuk-checkboxes__input').click();

    expect(onUpdate).toHaveBeenCalledWith(expected);
  });
});
