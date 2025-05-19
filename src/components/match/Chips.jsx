import clsx from "clsx";

const Chips = ({src, name, onClick, style}) => {
  return (
    <div
      className={clsx("flex gap-2 z-10 bg-white h-10 mt-2 items-center justify-center p-3 rounded-full shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] cursor-pointer", style)}
      onClick={onClick}>
      <img src={src} alt="meal" className="w-5 h-5"/>
      <p className="text-black text-sm font-bold text-center">{name}</p>
    </div>
  );
};

export default Chips;