import {useState} from "react";
import {toast} from "react-toastify";
import {icBack, icCamera} from "@assets/index.js";
import {string} from "@utils/string.js";
import CustomInput from "@components/common/CustomInput.jsx";
import LongButton from "@components/common/LongButton.jsx";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {pagePath} from "@/routes/pagePath.js";
import communityService from "@apis/community/communityService.js";

const CommunityPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [preViewImage, setPreViewImage] = useState("");

  const {navigateTo} = useCustomNavigation()

  const handleImage = (event) => {
    const file = event.target.files[0];

    if(file){
      console.log(file);
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend  = () => {
        setPreViewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleBack = () => {
    navigateTo(pagePath.COMMUNITY);
  }

  const handleComplete = async() => {
    if(title === ""){
      toast.warn('제목을 입력해주세요.');
      return;
    }
    if(content === ""){
      toast.warn('내용을 입력해주세요');
      return;
    }
    if(imageFile === ""){
      toast.warn('이미지를 업로드 해주세요');
      return;
    }

    try{
      const postData = {
        title: title,
        content: content,
        image: imageFile
      }
      await communityService.savePosts(postData);
      toast.success("성공적으로 게시글 등록을 완료했습니다.");
      setTimeout(() => {
        navigateTo(pagePath.COMMUNITY);
      }, 200);
    } catch(error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full flex justify-center pl-5 pr-5 mt-2 mb-10">
      <div className="w-[470px]">
        <div className="flex gap-2">
          <img src={icBack} alt="icBack" className="w-6 h-6 cursor-pointer" onClick={handleBack} />
          <p className="text-black text-lg font-bold">{string.WRITE}</p>
        </div>
        <label className="bg-neutral-200 rounded-xl flex flex-col items-center justify-center h-72 cursor-pointer mt-7 overflow-hidden">
          <input type="file" accept="image/*" onChange={handleImage} className="w-full h-full hidden"/>
          {imageFile ?
            <img src={preViewImage || null} alt="preViewImage" className="w-full h-full object-cover"/> :
            <div>
              <img src={icCamera} alt="icCamera" className="w-16 h-16"/>
              <p className="text-neutral-400 text-xl font-bold text-center">{string.SELECT}</p>
            </div>
          }
        </label>
        <div className="mt-4">
          <p className="text-black text-lg font-semibold mb-2">{string.TITLE}</p>
          <CustomInput text={string.PH_TITLE} value={title} setText={setTitle} />
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
        <LongButton text={string.COMPLETE} onClick={handleComplete}/>
      </div>
    </div>
  );
};

export default CommunityPost;