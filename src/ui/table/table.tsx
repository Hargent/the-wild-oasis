import React, { createContext, useContext } from "react";

import { CabinData } from "../../utils/types/cabin";
import { StyleProps } from "../../utils/types/styled-component-props";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)<{ columns: string }>`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
type TableProps = {
  children: React.ReactNode;
  columns: string;
};
type RowProps = {
  children: React.ReactElement[];
};
type HeaderProps = {
  children: React.ReactElement[];
};
type BodyProps = {
  data: CabinData[];
  render: (cabin: CabinData) => React.ReactElement;
};
type FooterProps = {
  children: React.ReactElement;
};

type contextType = {
  columns?: string;
};
const TableContext = createContext<contextType>({});
const Table: React.FC<TableProps> & {
  Row: typeof Row;
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
} = ({ children, columns }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Row: React.FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};
const Header: React.FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns!} as="header">
      {children}
    </StyledHeader>
  );
};
const Body: React.FC<BodyProps> = ({ data, render }) => {
  if (data.length === 0) {
    return <Empty>No data to show at the moment</Empty>;
  }

  return <StyledBody>{data.map(render)}</StyledBody>;
};
const Footer: React.FC<FooterProps> = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>;
};

Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
