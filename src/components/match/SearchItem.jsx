import {icLocate} from "@assets/index.js";

const SearchItem = ({place_name, address_name, onClick}) => {
  return (
    <div className="flex gap-2 p-3.5 cursor-pointer" onClick={onClick}>
      <img src={icLocate} className="w-6 h-6"/>
      <div>
        <p className="text-black text-lg font-bold">{place_name}</p>
        <p className="text-black text-sm font-normal">{address_name}</p>
      </div>
    </div>
  );
};

export default SearchItem;