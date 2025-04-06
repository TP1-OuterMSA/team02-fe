
const PostCardSkeleton = () => {
  return (
      <div className="w-full rounded-lg overflow-hidden border-(--light-grey) border cursor-pointer hover:shadow-2xl">
        <div className="skeleton w-full h-62"></div>
        <div className="pl-5 pb-3">
          <div className="skeleton w-95 mt-2"/>
          <div className="skeleton mt-1"/>
          <div className="skeleton mt-1"/>
        </div>
      </div>
  );
};

export default PostCardSkeleton;