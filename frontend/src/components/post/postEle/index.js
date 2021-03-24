import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createComment } from "../../../actions/comments/cmtAction";
import Spin from "../../spin";

export default function PostElement({ post, user }) {
  const [comment, setComment] = useState("");
  const [data, setdata] = useState({})

  const userId = user.userLogin ? user.userLogin._id : user._id;

  useEffect(() => {
    setdata(post)
    return () => {};
  }, []);
  const dispatch = useDispatch();
  // submit like News
  const handleLike = async (id) => {


    try {
      const url = "http://localhost:8080/api/";
      const { ata } = await axios.post(
        url + "likes",
        { userId , postId : id },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      ).then((res)=>{

        setdata(res.data);
      })
    } catch (error) {
      console.log(error.message);
    }
  };
  //handle Unlike
  const handleUnlike = async (id) => {
    try {
      const url = "http://localhost:8080/api/";

      const { data } = await axios.put(
        url + "likes",
        { userId , postId : id  },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      ).then((res) => setdata(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  //submit post comment
  const handleComment = async() => {
    const postId = post._id;
    try {
      const url = "http://localhost:8080/api/";

      const { data } = await axios.post(
        url + "comments",
        {
          comment , userId , postId
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      ).then(res => setdata(res.data));
      }
      catch(error){

      }
    setComment('')
  };


  return (
    <>
    {
      data  && <div className="postEle border_d">
      <div className="postele_top">
       {
         data.author &&  <Link to={'/profile/'+data.author._id}>
         <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"></img>
         <span> { data.author.fullName}</span>
       </Link>
       }
      </div>
      <div className="postele_main">
        <p>{data.title}</p>
      </div>
      <div className="postele_like">
        {data.likes && data.likes.some((item) => item.user == userId) ? (
          <button onClick={() => handleUnlike(data._id)}>
            <UnlikeButton />
          </button>
        ) : (
          <button onClick={()=>handleLike(data._id)}>
            <LikeButton />
          </button>
        )}

        <div className="number_like">{data.likes && data.likes.length} Like</div>
      </div>

      {data.comments && data.comments.length > 0 &&
        data.comments.map((cmt) => (
          <div className="postele_cmt" key={cmt._id}>
            <div className="user_cmt">
              <h6>{cmt.author.fullName}</h6>
            </div>
            <div className="titlt_cmt">{cmt.comment}</div>
          </div>
        ))}


      <div className="your_cmt">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment .. "
        />
        <button onClick={handleComment}>Post</button>
      </div>
    </div>
    }
    </>
  );
}

const LikeButton = () => {
  return (
    <svg
      aria-label="Thích"
      class="_8-yf5 "
      fill="#ed4956"
      height="24"
      viewBox="0 0 48 48"
      width="24"
    >
      <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>
  );
};
const UnlikeButton = () => {
  return (
    <svg
      aria-label="Bỏ thích"
      class="_8-yf5 "
      fill="#262626"
      height="24"
      viewBox="0 0 48 48"
      width="24"
    >
      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>
  );
};
