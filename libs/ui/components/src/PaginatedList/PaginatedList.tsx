import styled from 'styled-components';
import { Pagination } from './Pagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props<T extends { id?: any }> {
  title?: string;
  items?: readonly T[];
  pagination: {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
  };
  status?: 'pending' | 'error' | 'ready';
  errors?: readonly string[];
  renderItem: (item: T) => React.ReactNode;
  mapItemToKey?: (item: T) => string;
}

export const PaginatedList = function <ItemType>({
  title,
  items,
  pagination,
  status,
  errors,
  renderItem,
  mapItemToKey = (item: ItemType) => (hasId(item) ? `${item.id}` : `${item}`),
}: Props<ItemType>) {
  if (status === 'error') {
    return (
      <ErrorText>
        {errors && errors?.length > 0
          ? errors[0]
          : 'There was a problem searching for users'}
      </ErrorText>
    );
  }
  if (status === 'pending' && !items) {
    return <Spinner>Loading...</Spinner>;
  }

  if (!items) {
    return null;
  }
  return (
    <>
      {title ? <Title>{title}</Title> : null}
      <Ul loading={status === 'pending'}>
        {items.map((item) => (
          <Li key={mapItemToKey(item)}>{renderItem(item)}</Li>
        ))}
      </Ul>
      {pagination.totalPages > 1 && <Pagination {...pagination} />}
    </>
  );
};

const Ul = styled.ul<{ loading?: boolean }>`
  width: 100%;
  list-style: none;
  padding: 0;
  opacity: ${({ loading }) => (loading ? '0.5' : '1')};
`;

const Li = styled.li`
  padding: 16px;
  list-style-type: none;
  border-top-color: #d8dee4;
  border-top-style: solid;
  border-top-width: 1px;
`;

const Title = styled.h3`
  margin: auto;
`;

const ErrorText = styled.div`
  color: red;
  text-align: center;
  max-width: 500px;
`;

const Spinner = styled.div`
  color: rebeccapurple;
  text-align: center;
  max-width: 500px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasId = (item: any): item is { id: any } =>
  'id' in item && item.id !== undefined;
