import styled, { css } from "styled-components";

import { StyleProps } from "../../utils/types/styled-component-props";

const Row = styled.div<StyleProps>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
Row.defaultProps = {
  type: "vertical"
};
export default Row;
