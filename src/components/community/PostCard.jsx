import {icHand, icChat} from "@assets/index.js";

const PostCard = ({image, title, date, likeCount, commentCount, onClick}) => {
  return (
      <div className="w-full rounded-lg overflow-hidden border-(--light-grey) border cursor-pointer hover:shadow-2xl" onClick={onClick}>
        <img src={image} className="w-full h-62 object-cover"/>
        <div className="pl-5 pb-3">
          <p className="text-black text-lg font-semibold mt-3">{title}</p>
          <div className="flex gap-2 mt-1">
            <p className="text-(--text-grey) text-sm font-semibold">익명</p>
            <p className="text-(--text-grey) text-sm font-semibold">{date}</p>
          </div>
          <div className="flex gap-2 mt-1">
            <div className="flex gap-1">
              <img src={icHand}/>
              <p className="text-black text-base font-normal">{likeCount}</p>
            </div>
            <div className="flex gap-1">
              <img src={icChat}/>
              <p className="text-black text-base font-normal">{commentCount}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PostCard;