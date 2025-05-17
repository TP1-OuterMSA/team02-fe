
const SmallButton = ({text}) => {
  return (
    <div className="p-2 bg-blue-800 rounded-md cursor-pointer">
      <p className="text-white text-xs font-normal">{text}</p>
    </div>
  );
};

export default SmallButton;