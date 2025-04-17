import clsx from "clsx";
import {icSearch} from "@assets/index.js";
import {useState} from "react";

const SearchBar = ({placeholder, value, setValue, style}) => {
  const [isShowSearch, setIsShowSearch] = useState(true);
  return (
    <div className="w-full relative">
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsShowSearch(false)}
        onBlur={() => setIsShowSearch(true)}
        className={clsx("p-3 pl-5 w-full bg-white rounded-full outline-zinc-300 outline outline-1 focus:outline-2 focus:outline-(--primary)", style)}
      />
      {isShowSearch && <img src={icSearch} alt="search" className="absolute top-4 right-5"/>}
    </div>
  );
};

export default SearchBar;