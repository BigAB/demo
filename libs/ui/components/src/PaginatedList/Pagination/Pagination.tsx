import styled from 'styled-components';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: Props) => {
  const pages = getPagesArray(page, totalPages);

  return (
    <Container aria-label="Pagination">
      <PreviousPage disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </PreviousPage>
      {pages.map((p, i) =>
        p !== null ? (
          <PaginationButton
            key={p}
            onClick={() => onChange(p)}
            aria-label={`Page ${page}`}
            current={p === page}
          >
            {p}
          </PaginationButton>
        ) : (
          <Gap key={`null-${i}`}>…</Gap>
        )
      )}
      <NextPage
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </NextPage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  text-align: center;
`;

const PaginationButton = styled.button.attrs<{
  current?: boolean;
  disabled: boolean;
}>(({ current, disabled, ...rest }) => ({
  disabled: disabled || current,
  ...rest,
}))<{ current?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ current }) => (current ? '#0969da' : 'transparent')};
  color: ${({ current }) => (current ? '#fff' : '#24292f')};

  font-size: 0.5em;
  min-width: 2em;
  padding: 0.2em 0.5em;

  font-style: normal;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;

  cursor: pointer;
  user-select: none;

  border: 1px solid transparent;
  border-radius: 0.5em;
  transition: border-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  transition-duration: 0.1s;

  &:hover {
    border-color: ${({ disabled }) => (disabled ? 'transparent' : '#d0d7de')};
  }

  @media (min-width: 768px) {
    font-size: 0.8em;
  }
`;

const PrevAndNext = styled(PaginationButton)`
  color: ${({ disabled }) => (disabled ? '#8c959f' : '#0969da')};
  border-color: transparent;
  justify-content: flex-end;

  &::before,
  &::after {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: currentColor;
    margin-right: 0.2em;
    transform: scale(0.8);

    @media (min-width: 768px) {
      transform: scale(1);
    }
  }
`;

const PreviousPage = styled(PrevAndNext)`
  margin-left: -1em;

  &::before {
    content: '';
    clip-path: polygon(
      9.8px 12.8px,
      8.7px 12.8px,
      4.5px 8.5px,
      4.5px 7.5px,
      8.7px 3.2px,
      9.8px 4.3px,
      6.1px 8px,
      9.8px 11.7px,
      9.8px 12.8px
    );
  }
`;

const NextPage = styled(PrevAndNext)`
  &::after {
    content: '';
    clip-path: polygon(
      6.2px 3.2px,
      7.3px 3.2px,
      11.5px 7.5px,
      11.5px 8.5px,
      7.3px 12.8px,
      6.2px 11.7px,
      9.9px 8px,
      6.2px 4.3px,
      6.2px 3.2px
    );
  }
`;

const Gap = styled(PaginationButton).attrs({ disabled: true })`
  color: #8c959f;
  cursor: default;
  &:hover {
    border-color: transparent;
  }
`;

const range = (start: number, end: number) =>
  Array.from(Array(1 + end - start).keys(), (v) => v + start);

const getPagesArray = (
  page: number,
  totalPages: number
): readonly (number | null)[] => {
  const tryToShowOnSides = 2;
  const minShowAroundPage = 2;

  const left = Math.max(page - minShowAroundPage, 1);
  const right = Math.min(page + minShowAroundPage, totalPages);

  const hideLeftPages = left > tryToShowOnSides + 2;
  const hideRightPages = right < totalPages - (tryToShowOnSides + 1);

  if (!hideLeftPages && hideRightPages) {
    const leftRange = range(1, right);
    const endRange = range(totalPages - tryToShowOnSides + 1, totalPages);
    return [...leftRange, null, ...endRange];
  }

  if (hideLeftPages && !hideRightPages) {
    const leftRange = range(1, tryToShowOnSides);
    const rightRange = range(left, totalPages);
    return [...leftRange, null, ...rightRange];
  }

  if (hideLeftPages && hideRightPages) {
    const startRange = range(1, tryToShowOnSides);
    const middleRange = range(left, right);
    const endRange = range(totalPages - tryToShowOnSides + 1, totalPages);
    return [...startRange, null, ...middleRange, null, ...endRange];
  }

  return range(1, totalPages);
};
