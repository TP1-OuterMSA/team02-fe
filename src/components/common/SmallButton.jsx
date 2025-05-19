
const SmallButton = ({text, onClick}) => {
  return (
    <div className="p-2 bg-blue-800 rounded-md cursor-pointer" onClick={onClick}>
      <p className="text-white text-xs font-normal">{text}</p>
    </div>
  );
};

export default SmallButton;