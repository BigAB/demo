import styled from 'styled-components';
import { Tags } from './Tags';

interface Props {
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  name?: string;
  secondaryName?: string;
  desc?: string | null;
  tags?: readonly (string | readonly [string, string])[];
}

export const MultiNameMediaBlock = ({
  name,
  secondaryName,
  link,
  desc,
  imageSrc,
  imageAlt,
  tags,
}: Props) => (
  <Box>
    {imageSrc && (
      <Media>
        <a href={link}>
          <Avatar src={imageSrc} width="20" height="20" alt={imageAlt} />
        </a>
      </Media>
    )}

    <Content>
      <Names>
        {secondaryName && (
          <SecondaryName href={link}>{secondaryName}</SecondaryName>
        )}
        {name && (
          <PrimaryName href={link}>
            <em>{name}</em>
          </PrimaryName>
        )}
      </Names>

      <Description>{desc}</Description>

      {tags && tags.length > 0 ? <Tags data={tags} /> : null}
    </Content>
  </Box>
);

const Box = styled.div`
  display: flex;
  font-size: 0.8rem;
`;

const Media = styled.div`
  flex-shrink: 0;
  margin-right: 0.4rem;
`;

const Content = styled.div`
  flex: auto;
`;

const Avatar = styled.img`
  margin-top: 2px;
  border-radius: 50%;
`;

const Names = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const SecondaryName = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #0969da;

  &[href]:hover {
    text-decoration: underline;
  }
`;

const PrimaryName = styled(SecondaryName)`
  color: #57606a;

  > em {
    font-style: normal;
    font-weight: bold;
  }
`;

const Description = styled.p`
  font-size: 0.7rem;
  margin: 0.4rem auto;
`;
