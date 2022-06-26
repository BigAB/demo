import styled from 'styled-components';

export const SearchIcon = () => (
  <SVGIcon
    aria-hidden="true"
    height="24"
    width="24"
    viewBox="0 0 24 24"
    version="1.1"
  >
    <path
      fillRule="evenodd"
      d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
    ></path>
  </SVGIcon>
);

const SVGIcon = styled.svg`
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
`;
