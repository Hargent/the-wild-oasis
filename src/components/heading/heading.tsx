import styled, { css } from "styled-components";

import { StyleProps } from "../../utils/types/styled-component-props";

const Heading = styled.h1<StyleProps>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 2rem;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
  line-height:1.4;
`;

export default Heading;
