import {string} from "@utils/string.js";

const DropDown = ({onClick}) => {
  return (
    <div className="w-40 max-w-72 min-w-40 bg-white rounded-lg shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)] p-2">
      <p className="dropdown_menu" onClick={() => onClick(string.EDIT)}>{string.EDIT}</p>
      <p className="dropdown_menu" onClick={() => onClick(string.EDIT)}>{string.BLOCK}</p>
      <p className="dropdown_menu text-red-600" onClick={() => onClick(string.DELETE)}>{string.DELETE}</p>
    </div>
  );
};

export default DropDown;