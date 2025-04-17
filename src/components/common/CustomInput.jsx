import clsx from "clsx";

const CustomInput = ({type, text, setText, value, style}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={text}
      onChange={(e) => setText(e.target.value)}
      className={clsx("p-3 w-full bg-white rounded-lg outline-zinc-300 outline outline-1 focus:outline-2 focus:outline-(--primary)", style)}
    />
  );
};

export default CustomInput;