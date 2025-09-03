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
    <div className="relative flex-1 max-w-lg hidden md:flex">
      <Search
        onClick={handleSearch}
        className="absolute top-1/2 left-3 -translate-y-1/2 stroke-secondaryDark hover:stroke-sky-700 hover:stroke-2 cursor-pointer"
        size={22}
        strokeWidth={1}
      />
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="w-full border-secondaryDark pl-10 pr-3"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
export default AppSearchBar;
