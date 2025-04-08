import {icClose} from "@assets/index.js";
import {string} from "@utils/string.js";
import CustomInput from "@components/common/CustomInput.jsx";
import LongButton from "@components/common/LongButton.jsx";

const PostDetailEdit = ({handleClose, imageFile, handleImage, title, setTitle, content, setContent, handleComplete}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
      <div className="bg-white w-130 pb-10 z-20 rounded-2xl pl-10 pr-10">
        <div className="flex justify-between pt-10">
          <p className="text-black text-2xl font-bold">{string.T_EDIT}</p>
          <img src={icClose} className="w-6 h-6 cursor-pointer" onClick={handleClose}/>
        </div>
        <label
          className="bg-neutral-200 rounded-xl flex flex-col items-center justify-center h-72 cursor-pointer mt-7 overflow-hidden relative">
          <input type="file" accept="image/*" onChange={handleImage} className="w-full h-full hidden"/>
          <img src={imageFile} alt="preViewImage" className="w-full h-full object-cover"/>
          <p
            className=" absolute bottom-5 left-5 text-white text-bold bg-black p-2 pl-5 pr-5 rounded-2xl">{string.PHOTOEDIT}</p>
        </label>
        <div className="mt-4">
          <p className="text-black text-lg font-semibold mb-2">{string.TITLE}</p>
          <CustomInput text={string.PH_TITLE} value={title} setText={setTitle}/>
        </div>
        <div className="mt-4 mb-6">
          <p className="text-black text-lg font-semibold mb-2">{string.CONTENT}</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={string.PH_CONTENT}
            className="w-full p-3 rounded-lg outline-zinc-300 outline outline-1 h-45 focus:outline-(--primary)"
          />
        </div>
        <LongButton text={string.EDITCOMPLETE} onClick={handleComplete}/>
      </div>

    </div>
  );
};

export default PostDetailEdit;