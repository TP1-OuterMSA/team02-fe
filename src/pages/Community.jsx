import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {ClipLoader} from "react-spinners";
import PostCard from "@components/community/PostCard.jsx";
import FloatingActionButton from "@components/common/FloatingActionButton.jsx";
import PostCardSkeleton from "@components/community/PostCardSkeleton.jsx";
import Badges from "@components/common/Badges.jsx";
import {pagePath} from "@/routes/pagePath.js";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import communityService from '@apis/community/communityService.js';
import dayjs from "dayjs";
import {imgBlank} from "@assets/index.js";
import {constant} from "@utils/constant.js";
import {string} from "@utils/string.js";

const Community = () => {
  const badges = [{id: constant.ALL, name: string.ALL}, {id: constant.LIKE, name: string.LIKE}, {id:constant.COMMENT, name:string.COMMENT}, {id: constant.MY, name: string.MY}];

  const [cursor, setCursor] = useState(0);
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [activeBadge, setActiveBadge] = useState(constant.ALL);

  const {navigateTo} = useCustomNavigation();
  const {ref, inView} = useInView({
    threshold: 0,
  });

  const handleFAB = () => {
    navigateTo(pagePath.POST);
  }

  const handlePostCard = (id) => {
    navigateTo(pagePath.COMMUNITY+`detail/${id}`);
  }

  const handleBadges = (type) => {
    setCursor(0);
    setPostData([]);
    setActiveBadge(type);
  }

  const fetchData = async (isLoadMore = false) => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const posts = await communityService.getPosts(cursor, 4, activeBadge);

      if (posts.length > 0) {
        setPostData((prev) => {
          const newPosts = posts.filter((post) => !prev.some((p) => p.id === post.id)); // 중복 제거
          return isLoadMore ? [...prev, ...newPosts] : [...newPosts];
        });

        setCursor((prevCursor) =>
            posts[posts.length - 1].id !== prevCursor ? posts[posts.length - 1].id : prevCursor
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };


  // 커뮤니티 글 목록 api 연결
  useEffect( () => {
    // localStorage.setItem("userId", 1);
  }, []);


  useEffect(() => {
    fetchData()
  }, [activeBadge])


  useEffect(() => {
    if(inView && !isFetching && cursor !== null){
      fetchData(true);
    }
  }, [inView]);

  if(isLoading){
    return (
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 mt-10 mb-10 gap-5 pl-5 pr-5 w-150 max-md:w-full">
          {new Array(4).fill(0).map((_, idx) =>
            <PostCardSkeleton key={idx}/>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="pl-5 pr-5 w-150 max-md:w-full flex gap-3">
        {badges.map((badge, index) => (
          <Badges
            key={index}
            name={badge.name}
            isActive={activeBadge === badge.id}
            onClick={() => {handleBadges(badge.id)}}
          />
        ))}
      </div>
        {postData ? (
            <div className="grid grid-cols-1 mt-5 mb-10 gap-5 pl-5 pr-5 w-150 max-md:w-full">
              {postData?.map((post) =>
                  (<PostCard
                      key={post.id}
                      image={post.imageLink}
                      title={post.title}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                      date={dayjs(post.createdAt).format("YY.MM.DD")}
                      onClick={() => handlePostCard(post.id)}
                  />)
              )}
            </div>
        ) : (
            <div className="flex flex-col items-center w-full mt-50">
              <img src={imgBlank} alt="blank images" className="w-52 h-42"/>
              <p className="text-black text-3xl font-bold mt-6">{string.BLANK}</p>
              <p className="text-neutral-400 text-1xl font-normal mt-1">{string.BLANK_CONTENT}</p>
            </div>
        )}
        <div className="w-full h-[50px] flex justify-center" ref={ref}>
          {isFetching && <ClipLoader/>}
        </div>
        <FloatingActionButton onClick={handleFAB}/>
      </div>
  );
};

export default Community;