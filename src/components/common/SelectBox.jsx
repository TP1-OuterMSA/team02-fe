import {icDown} from "@assets/index.js";

const SelectBox = ({placholder, items, onChange}) => {
  return (
      <form className="relative w-full">
        <img src={icDown} className="absolute right-3 top-4"/>
        <select name="selectBox" defaultValue="default" className="w-full p-3 bg-white rounded-lg border border-zinc-300 border-1 focus:border-1.5 focus:outline-(--primary)" onChange={(e) => onChange(e.target.value)}>
          <option value="default" disabled hidden>{placholder}</option>
          {items.map((item, index) => (
              <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </form>
  );
};

export default SelectBox;