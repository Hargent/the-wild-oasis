import { OptionType } from "../../utils/types/data";
import { StyleProps } from "../../utils/types/styled-component-props";
import styled from "styled-components";

const StyledSelect = styled.select<StyleProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
type SelectProps = {
  options: OptionType[];
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select: React.FC<SelectProps> = ({
  options,

  onChange,
  ...props
}) => {
  return (
    <StyledSelect {...props} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};
export default Select;
