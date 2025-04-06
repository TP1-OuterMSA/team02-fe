import {imgProfile, icSiren, icReplyEdit, icTrash, icCheck} from "@assets/index.js";
import {string} from "@utils/string.js";
import {constant} from "@utils/constant.js";
import dayjs from "dayjs";

const ReplyForm = ({data,comment,setComment, isMine, isEdit, handleMenu, onEditComplete}) => {
  return (
      <div>
        <div className="flex items-center justify-between pr-2 mt-6">
          <div className="flex gap-2">
            <img src={imgProfile} className="w-6 h-6"/>
            <p className="text-black text-base font-semibold">{string.NONAME}</p>
          </div>
          <div className="flex gap-3">
            {!isMine && <img src={icSiren} alt="신고 아이콘" className="w-5 h-5 cursor-pointer" onClick={() => handleMenu(data.commentId, constant.SIREN)}/>}
            {isMine && <img src={isEdit ? icCheck : icReplyEdit} alt="수정 아이콘" className="w-5 h-5 cursor-pointer" onClick={() => handleMenu(data.commentId, constant.EDIT)}/>}
            {isMine && <img src={icTrash} alt="삭제 아이콘" className="w-5 h-5 cursor-pointer" onClick={() => handleMenu(data.commentId, constant.DELETE)}/>}
          </div>
        </div>
        {isEdit ?
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value, data)}  className="mt-2 border-b border-gray-300 rounded px-1 py-1 w-full text-base"/> :
            <p className="text-black text-base font-medium mt-2">{data.content}</p>}
        <p className="text-stone-500 text-sm font-normal mt-1">{dayjs(data.createdAt).format("YY.MM.DD HH:MM")}</p>
      </div>
  );
};

export default ReplyForm;