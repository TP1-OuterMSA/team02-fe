

const CustomInput = ({text, setText, value}) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={text}
      onChange={(e) => setText(e.target.value)}
      className="p-3 w-full bg-white rounded-lg outline-zinc-300 outline outline-1 focus:outline-(--primary)"
    />
  );
};

export default CustomInput;