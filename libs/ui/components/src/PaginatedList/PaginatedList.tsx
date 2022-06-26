import styled from 'styled-components';
import { Pagination } from './Pagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props<T extends { id?: any }> {
  title?: string;
  items: readonly T[];
  pagination: {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
  };
  renderItem: (item: T) => React.ReactNode;
  mapItemToKey?: (item: T) => string;
}

export const PaginatedList = function <ItemType>({
  title,
  items,
  pagination,
  renderItem,
  mapItemToKey = (item: ItemType) => (hasId(item) ? `${item.id}` : `${item}`),
}: Props<ItemType>) {
  return (
    <>
      {title ? <Title>{title}</Title> : null}
      <Ul>
        {items.map((item) => (
          <Li key={mapItemToKey(item)}>{renderItem(item)}</Li>
        ))}
      </Ul>
      {pagination.totalPages > 1 && <Pagination {...pagination} />}
    </>
  );
};

const Ul = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasId = (item: any): item is { id: any } =>
  'id' in item && item.id !== undefined;
