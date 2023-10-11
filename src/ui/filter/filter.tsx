import styled, { css } from "styled-components";

import { OptionType } from "../../utils/types/data";
import { StyleProps } from "../../utils/types/styled-component-props";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<StyleProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type FilterProps = {
  filterField: string;
  options: OptionType[];
};

const Filter: React.FC<FilterProps> = ({ filterField, options }) => {
  const initialSearchParams = new URLSearchParams();

  const [searchParams, setSearchParams] = useSearchParams(initialSearchParams);
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;
  const handleClick = (arg: string) => {
    searchParams.set(filterField, arg);
    // setSearchParams(searchParams);
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }

    setSearchParams(new URLSearchParams(searchParams.toString()));
  };
  return (
    <StyledFilter>
      {options.map((option: OptionType) => (
        <FilterButton
          key={option.value}
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
