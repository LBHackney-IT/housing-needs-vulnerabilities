import { render } from '@testing-library/react';
import Accordion from './index';

describe('Accordion', () => {
  it('renders a accordion', () => {
    const { container, getByText } = render(<Accordion title="my acc" />);
    expect(container.querySelector('.govuk-accordion')).toBeInTheDocument();
    expect(getByText('my acc')).toBeInTheDocument();
  });
});
