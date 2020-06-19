import { render } from '@testing-library/react';
import CheckboxList from './index';

describe('CheckboxList', () => {
  it('renders a checkbox list', () => {
    const { container } = render(<CheckboxList />);
    expect(container.querySelector('.govuk-checkboxes')).toBeInTheDocument();
  });
});
