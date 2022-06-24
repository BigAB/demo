import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PageLayoutProps {
  children: React.ReactNode;
}

const StyledPageLayout = styled.div`
  color: blue;
  padding: 1rem;
`;

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <StyledPageLayout>
      <h1>THIS IS A PageLayout!</h1>
      {children}
    </StyledPageLayout>
  );
}

export default PageLayout;
