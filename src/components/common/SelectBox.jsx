import {icDown} from "@assets/index.js";

const SelectBox = ({placholder, items}) => {
  return (
      <form className="relative w-full">
        <img src={icDown} className="absolute right-3 top-4"/>
        <select name="selectBox" className="w-full p-3 bg-white rounded-lg border border-zinc-300 border-1 focus:border-1.5 focus:outline-(--primary)">
          <option value="none">{placholder}</option>
          {items.map((item, index) => (
              <option key={index} value={item.id}>{item}</option>
          ))}
        </select>
      </form>
  );
};

export default SelectBox;