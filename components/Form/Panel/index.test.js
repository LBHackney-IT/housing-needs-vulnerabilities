import { render } from '@testing-library/react';
import Panel from './index';

describe('Panel', () => {
  it('renders a panel', () => {
    const panelTitle = 'My Panel';
    const panelBody = 'Hi there!';
    const { getByText } = render(<Panel title={panelTitle}>{panelBody}</Panel>);
    expect(getByText(panelTitle)).toBeInTheDocument();
    expect(getByText(panelBody)).toBeInTheDocument();
  });

  it('hides the title if no title', () => {
    const { container } = render(<Panel>yo</Panel>);
    expect(container.querySelector('h2')).not.toBeInTheDocument();
  });
});
