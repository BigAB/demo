import styled from 'styled-components';

interface Props {
  data: readonly (string | [string, string])[];
}

export const Tags = ({ data }: Props) => (
  <TagList>
    {data.map((t) => {
      const label = typeof t === 'string' ? t : t[0];
      const href = typeof t === 'string' ? undefined : t[1];
      return (
        <Tag key={label} href={href}>
          {label}
        </Tag>
      );
    })}
  </TagList>
);

export const TagList = styled.div`
  display: flex;
  color: #57606a;
  font-size: 0.6rem;
  gap: 0.8rem;
`;

export const Tag = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) => (
  <span>{href ? <TagAnchor href={href}>{children}</TagAnchor> : children}</span>
);

const TagAnchor = styled.a`
  text-decoration: none;
  color: currentColor;

  &:hover {
    color: #0969da;
  }
`;
