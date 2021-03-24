import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMyPost } from "../../actions/posts/postAction";
import { getMyProfile } from "../../actions/users/userAction";
import PostElement from "../post/postEle";
import ProfileEleTop from "./profileEle";

export default function ProfileEle() {
  let { id } = useParams();

  const [dataUser, setdataUser] = useState({})

  const getMyProfileSt = useSelector((state) => state.getMyProfileSt);
  const { userProfile ,loading } = getMyProfileSt;

  const getMypostSt = useSelector(state => state.getMypostSt)
  const { posts } =getMypostSt;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch()

  useEffect(async() => {
      dispatch( getMyProfile({id}))
      dispatch(getMyPost({user : id}))
      return () => {
      }
  }, [])


  return (
    <div className="profile">
      <div className="container">
          { userProfile && userProfile.users&& <ProfileEleTop others={userProfile} user={userInfo} />}
          <div className="profile_post">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <PostElement post={post} key={post._id} user={userProfile} />
            ))}
          </div>
      </div>
    </div>
  );
}
