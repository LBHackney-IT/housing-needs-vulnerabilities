import { render } from '@testing-library/react';
import Details from './index';

describe('Details', () => {
  it('renders a details', () => {
    const title = 'the title';
    const text = 'the text';
    const { getByText } = render(<Details title={title}>{text}</Details>);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
  });
});
