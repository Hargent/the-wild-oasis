import Filter from "../../ui/filter/filter";
import Sort from "../../ui/sort/sort";
import TableOperations from "../../components/table-operations/table-operations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" }
        ]}
      />
      <Sort
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sort by price (low first)"
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price (high first)"
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (low first)"
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (high first)"
          }
        ]}
      />
    </TableOperations>
  );
};
export default CabinTableOperations;
