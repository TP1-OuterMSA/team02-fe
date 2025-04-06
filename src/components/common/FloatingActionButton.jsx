import {icEdit} from "@assets/index.js";

const FloatingActionButton = ({onClick}) => {
  return (
      <div className="rounded-2xl w-16 h-16 bg-(--primary) flex justify-center items-center shadow-2xl fixed bottom-10 right-10 cursor-pointer" onClick={onClick}>
        <img src={icEdit} className="w-6 h-6"/>
      </div>
  );
};

export default FloatingActionButton;