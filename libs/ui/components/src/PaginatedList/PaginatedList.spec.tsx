import { render, screen } from '@testing-library/react';
import { PaginatedList } from './PaginatedList';

describe('PaginatedList', () => {
  it('should show a pagination control if there is more than 1 page in the list', async () => {
    render(
      <PaginatedList
        items={[]}
        renderItem={() => <div>Item</div>}
        pagination={{ page: 1, totalPages: 2, onChange: jest.fn() }}
      />
    );
    expect(await screen.findByLabelText('Pagination')).toBeInTheDocument();
  });
  it('should NOT show a pagination control if there is less than 2 pages in the list', async () => {
    render(
      <PaginatedList
        items={[]}
        renderItem={() => <div>Item</div>}
        pagination={{ page: 1, totalPages: 1, onChange: jest.fn() }}
      />
    );
    expect(screen.queryByLabelText('Pagination')).toBeNull();
  });
});
