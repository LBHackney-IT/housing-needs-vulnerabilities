import { render } from '@testing-library/react';
import AccordionItem from './index';

describe('AccordionItem', () => {
  it('renders a accordion item', () => {
    const { container, getByText } = render(
      <AccordionItem heading="the heading">the content</AccordionItem>
    );
    expect(container).toBeInTheDocument();
    expect(getByText('the heading')).toBeInTheDocument();
    expect(getByText('the content')).toBeInTheDocument();
  });
});
