import { OptionType } from "../../utils/types/data";
import Select from "../../components/select/select";
import { useSearchParams } from "react-router-dom";

type SortProps = {
  options: OptionType[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Sort: React.FC<SortProps> = ({ options }) => {
  const initialSearchParams = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(initialSearchParams);

  const sortBy = searchParams.get("sortBy") || "";
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    searchParams.set("sortBy", selectedValue);

    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
    />
  );
};
export default Sort;
