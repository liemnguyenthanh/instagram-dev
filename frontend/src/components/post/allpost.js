import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/posts/postAction";
import PostElement from "./postEle";

export default function AllPostEle() {
  const dispatch = useDispatch();

  const getPostSt = useSelector((state) => state.getPostSt);
  const { posts } = getPostSt;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const createPost = useSelector((state) => state.createPost);
  const { post } = createPost;

  useEffect(() => {
    dispatch(getPost());
    return () => {
    };
  }, [post]);

  return (
    <div className="post_home">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostElement post={post} key={post._id} user={userInfo} />
        ))}
    </div>
  );
}
