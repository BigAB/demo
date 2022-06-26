import { render, screen } from '@testing-library/react';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  it('should render successfully', async () => {
    render(<PageLayout>Content</PageLayout>);
    expect(await screen.findByText('Content')).toBeInTheDocument();
  });
});
