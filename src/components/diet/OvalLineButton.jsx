const OvalLineButton = ({src, onClick}) => {
  return (
    <div>
      <button className="p-2 rounded-full border border-neutral-200 cursor-pointer" onClick={onClick}>
        <img src={src} className="w-5 h-5"/>
      </button>
    </div>
  );
};

export default OvalLineButton;