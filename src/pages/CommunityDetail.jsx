import {useEffect, useState, useRef} from "react";
import {useLocation} from "react-router-dom";
import dayjs from "dayjs";
import {toast} from "react-toastify";

import {icKebab, icHand, icHandFill, icSend, icChat, icPerson, icDate} from "@assets";
import communityService from "@apis/community/communityService.js";
import commentService from "@apis/comments/commentService.js";
import ReplyForm from "@components/communityDetail/ReplyForm.jsx";
import DropDown from "@components/common/DropDown.jsx";
import PostDetailEdit from "@components/modal/PostDetailEdit.jsx";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {pagePath} from "@/routes/pagePath.js";
import {string} from "@utils/string.js";
import {constant} from "@utils/constant.js";



const CommunityDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState();
  const [reply, setReply] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [floatReactions, setFloatReactions] = useState([]);
  const [replyEditMap, setReplyEditMap] = useState({});
  const [image, setImage] = useState();
  const [preView, setPreView] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [commentMap, setCommentMap] = useState({});

  const postId = useLocation().pathname.split("/").splice(4, 1);
  const myId = localStorage.getItem("userId");
  const menuRef = useRef(null);

  const {navigateTo} = useCustomNavigation()

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // 메뉴 바깥을 클릭하면 닫기
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  } , [isMenuOpen])

  const fetchData = async () => {
    try {
      const postDetails = await communityService.getPostById(postId);
      setDetail(postDetails);
      setReply(postDetails.commentResponseList);
      setPreView(postDetails.image);
      setTitle(postDetails.title);
      setContent(postDetails.content);
      setIsLiked(postDetails.likeStatus);
    } catch (e) {
      console.error(e);
    }
  }

  const handleImagePreView = (event) => {
    const file = event.target.files[0];

    if(file){
      setImage(file);

      const reader = new FileReader();
      reader.onloadend  = () => {
        setPreView(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // 게시글 수정 API 연동
  const handleEditComplete = async () => {
    try{
      const postData = {
        postId: postId,
        title:title,
        content:content,
        image: image
      }
      await communityService.updatePosts(postData);
      setIsEdit(false);
      toast.success("성공적으로 게시글 수정을 완료했습니다.");
      await fetchData();
    } catch(error){
      toast.error(error.message);
    }
  }

  // 게시글 드롭 다운 메뉴 관리
  const handleMenu = async (menu) => {
    if(menu === string.EDIT) {
      setIsEdit(true);
    } else{
      await communityService.deletePost(postId);
      toast.success("게시글을 삭제하였습니다.")
      navigateTo(pagePath.COMMUNITY);
    }
    setIsMenuOpen(false);
  }

  // 댓글 등록 API 연결
  const handleReply = async () => {
    try{
      const postData = {
        postId: postId,
        content: search
      }
      if(search === "") return
      await commentService.saveComments(postData);
      toast.success("댓글이 등록되었습니다.");
      setSearch("");

      await fetchData();
    } catch(error){
      console.error(error);
    }
  }

  // 댓글 메뉴 관리(신고, 수정, 삭제)
  const handleReplyMenu = async (commentId, menu) => {
    switch(menu){
      case constant.EDIT:
        setReplyEditMap(prev => ({...prev, [commentId]: !prev[commentId]}));
        if(replyEditMap[commentId] && !!commentMap[commentId]){
          await updateComment(commentId, commentMap[commentId]);

        }
        break;
      case constant.SIREN:
        break;
      case constant.DELETE:
        await deleteComment(commentId);
        break;
    }
    await fetchData();
  }

  // 댓글 수정 API
  const updateComment = async (commentId, content) => {
    try{
      const postData = {
        commentId: commentId,
        content: content
      }
      await commentService.updateComment(postData);
      toast.success("댓글 수정이 완료되었습니다.");
    } catch(error){
      toast.error(error.message);
    }
  }

  // 댓글 삭제 API
  const deleteComment = async (commentId) => {
    try{
      await commentService.deleteComment(commentId);
      toast.success("댓글 삭제가 완료되었습니다.");
    } catch (error){
      toast.error(error.message);
    }
  }

  // 변경 내용 댓글 저장(controlled Input)
  const handleReplyComment = (value, reply) => {
    setCommentMap(prev => ({
      ...prev,
      [reply.commentId]: value
    }));
  }

  // 좋아요 누르는것 관리
  const handleLike = async () => {
    setIsLiked(!isLiked);
    if(postId) {
      isLiked ? await communityService.unLikePost(postId) : await communityService.likePost(postId);
    }

    await fetchData();
    const newReactions = Array.from({ length: 5 }).map(() => ({
      id: crypto.randomUUID(),
      left: Math.random() * 80 + 10, // 10% ~ 90%
      size: Math.random() * 40 + 60, // 20px ~ 40px
      duration: Math.random() * 1.5 + 2, // 1.5s ~ 3s
      bottom: Math.random() * 100 + 130 // 20px ~ 120px
    }));

    setFloatReactions((prev) => [...prev, ...newReactions]);

    // 일정 시간 후 제거
    setTimeout(() => {
      setFloatReactions((prev) => prev.slice(newReactions.length));
    }, 3000); // 3초 후 제거
  }

  return (
      <div className="pl-10 pr-10 text-wrap mb-10 w-full">
        <header className="border-b pb-6 border-gray-200 relative">
          <div className="flex justify-between mt-10">
            <p className="text-black text-2xl font-semibold">{detail?.title}</p>
          <img src={icKebab} className="w-6 h-6" onClick={() => setIsMenuOpen(!isMenuOpen)}/>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex gap-1 items-center">
            <img src={icPerson} className="w-5 h-5"/>
            <p className="text-zinc-600 text-base font-normal">{string.NONAME}</p>
          </div>
          <div className="flex gap-1 items-center">
            <img src={icDate} className="w-5 h-5"/>
            <p className="text-zinc-600 text-base font-normal">{dayjs(detail?.createdAt).format("YY.MM.DD")}</p>
          </div>
        </div>
        {isMenuOpen && (
          <div ref={menuRef} className={`menu ${isMenuOpen ? "open" : ""} absolute top-10 right-0`}>
            <DropDown onClick={handleMenu} />
          </div>
        )}
      </header>
        <main className="mt-15">
          <div className="fixed bottom-10 left-0 w-full h-full pointer-events-none z-50">
            {isLiked && floatReactions.map((item) => (
              <img
                key={item.id}
                src={icHandFill}
                style={{
                  left: `${item.left}%`,
                  bottom: `${item.bottom}px`,
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  animation: `float ${item.duration}s ease-in-out forwards`,
                }}
                className={`animate-float ${item.duration}s ease-in-out forwards infinite absolute`}
              />
            ))}
          </div>
          <section className="flex flex-col items-center text-wrap">
            <img src={detail?.image} className="w-150"/>
            <p className="text-black text-lg font-medium text-left mt-5">{detail?.content}</p>
          </section>
          <section className="flex gap-2 mt-15 border-b pb-6 border-gray-200">
            <div className="flex gap-1 items-center">
              <img src={isLiked ? icHandFill : icHand} onClick={handleLike} className="w-5 h-5 cursor-pointer"/>
              <p className="text-black text-base font-normal">{detail?.likeCount}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img src={icChat} className="w-5 h-5"/>
              <p className="text-black text-base font-normal">{detail?.commentCount}</p>
            </div>
          </section>
        </main>
        <main>
          <div className="relative w-full">
            <input onKeyUp={(e) => {
              if (e.key === "Enter") handleReply()
            }} value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                   className="w-full h-10 rounded-lg outline outline-1 outline-zinc-300 mt-6 pl-5 pr-10"
                   placeholder={string.PH_REPLY}/>
            <img src={icSend} className="w-5 h-5 absolute top-9 right-3" onClick={handleReply}/>
        </div>
        <div className="mt-10 pl-1 pr-1">
          {reply?.map((item, idx) =>
            <ReplyForm
                key={idx}
                data={item}
                isMine={myId === item?.userId.toString()}
                isEdit={replyEditMap[item?.commentId] === true}
                comment={commentMap[item?.commentId] !== undefined ? commentMap[item?.commentId] : item.content}
                setComment={handleReplyComment}
                handleMenu={handleReplyMenu}/>
          )}
        </div>
      </main>
      {isEdit &&
        <PostDetailEdit
          handleClose={() => setIsEdit(false)}
          imageFile={preView}
          handleImage={handleImagePreView}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleComplete={handleEditComplete}
        />}
    </div>
  );
};

export default CommunityDetail;