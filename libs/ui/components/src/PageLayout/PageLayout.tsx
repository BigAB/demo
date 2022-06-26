import styled from 'styled-components';

export interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <StyledPageLayout>
      <Header>User Search</Header>
      <Main>
        <div>{children}</div>
      </Main>
    </StyledPageLayout>
  );
};

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  padding: 0.8rem 1.6rem;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1.5;
  color: #fff;
  background-color: #24292f;
  align-items: center;
  flex-wrap: nowrap;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 0;
`;
