import styled from 'styled-components';
import { SearchIcon } from '../Icons';

interface Props {
  onSearch: (value: string) => void;
}

export const SearchForm = ({ onSearch }: Props) => {
  return (
    <Container>
      <Heading>
        <SearchIcon />{' '}
        <span>
          Search for <strong>Users</strong> by username
        </span>
      </Heading>
      <Form
        action="/search"
        accept-charset="UTF-8"
        method="get"
        onSubmit={(ev) => {
          ev.preventDefault();
          const searchQ = new FormData(ev.currentTarget).get('q');
          if (searchQ && typeof searchQ === 'string') {
            onSearch(searchQ);
          }
        }}
      >
        <ControlWrapper>
          <Input
            aria-label="Search Users"
            autoCapitalize="off"
            autoComplete="off"
            autoFocus
            className="form-control input-block"
            data-hotkey="s"
            name="q"
            placeholder="Search Users"
            spellCheck="false"
            type="text"
          />
          <Button type="submit">Search</Button>
        </ControlWrapper>
      </Form>
      <HelperText>
        <strong>What Users?{` `}</strong>
        <span>
          This search is powered by the{' '}
          <a href="https://developer.github.com/v3/search/">Github API</a> and
          is rate limited.
        </span>
      </HelperText>
    </Container>
  );
};

const Container = styled.div`
  max-width: 932px;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Heading = styled.h2`
  font-weight: 400;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Form = styled.form`
  margin: 0.8rem auto;
`;

const ControlWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;=
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  box-shadow: inset 0 1px 0 rgba(208,215,222,0.2);
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
`;

const Button = styled.button`
  color: #24292f;
  background-color: #f6f8fa;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;

  position: relative;
  display: inline-block;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 6px;
  appearance: none;

  &:hover {
    color: #24292f;
    background-color: #f6f8fa;
    border-color: #1b1f2426;
    box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
`;

const HelperText = styled.p`
  margin: auto;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    font-weight: normal;
    font-size: 0.6rem;
  }
`;
