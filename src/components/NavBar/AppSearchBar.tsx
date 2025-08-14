import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

function AppSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  function handleSearch() {
    //handle search
    console.log(searchValue);
  }
  return (
    <div className="h-[60%] w-1/2 relative">
      <Search
        onClick={handleSearch}
        className="absolute top-1/2 left-[25px] transform -translate-x-1/2 -translate-y-1/2 stroke-secondaryDark hover:stroke-sky-700 hover:stroke-2 cursor-pointer"
        size={25}
        strokeWidth={1}
      />
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="h-full border-secondaryDark px-12"
        onChange={(e) => setSearchValue(e.target.value)}
      ></Input>
    </div>
  );
}
export default AppSearchBar;
