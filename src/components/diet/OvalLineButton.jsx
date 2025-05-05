const OvalLineButton = ({src, onClick, size}) => {
  return (
    <div>
      <button className="p-2 rounded-full border border-neutral-200 cursor-pointer" onClick={onClick}>
        <img src={src} className={`w-${size} h-${size}`}/>
      </button>
    </div>
  );
};

export default OvalLineButton;