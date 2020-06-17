import { render } from '@testing-library/react';
import Accordion from './index';

describe('Accordion', () => {
  it('renders a accordion', () => {
    const { container } = render(<Accordion />);
    expect(container.querySelector('.govuk-accordion')).toBeInTheDocument();
  });
});
