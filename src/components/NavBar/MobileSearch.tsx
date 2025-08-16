import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MobileSearch({ onSearch }:{onSearch:any}) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="md:hidden px-4 p-4 w-[80%] m-auto">
      <div className="relative w-full">
        <Search
          onClick={handleSearch}
          className="absolute top-1/2 left-3 -translate-y-1/2 stroke-secondaryDark hover:stroke-sky-700 cursor-pointer"
          size={22}
          strokeWidth={1}
        />
        <Input
          value={searchValue}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full border-secondaryDark pl-10 pr-3"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
}
