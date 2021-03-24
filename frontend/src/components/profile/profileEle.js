import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileEleTop({ others, user }) {
  const [dataUser, setdataUser] = useState({});
  useEffect(() => {
    setdataUser(others);
    return () => {};
  }, []);
  const handleFollow = async () => {
    const userId = others.users._id;
    const userFollowId = user.userLogin._id;
    try {
      const url = "http://localhost:8080/api/";
      await axios
        .post(
          url + "follows/follower",
          { userId, userFollowId: userFollowId },
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then((res) => {
          setdataUser(res.data)
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUnFollow = async () => {
    const userId = others.users._id;
    const userFollowId = user.userLogin._id;
    try {
      const url = "http://localhost:8080/api/";
      await axios
        .put(
          url + "follows/unfollow",
          { userId, userFollowId: userFollowId },
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then((res) => {
          setdataUser(res.data)
        });
    } catch (error) {
      console.log(error.message);
    }
  };
console.log("data:",dataUser)
  return (
    <div className="border_d  ">
      {dataUser && dataUser.users && (
        <div className="profile_top">
          <div className="profilr_top_info">
            <img
              src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"
              alt=""
              srcset=""
            />
            <div className="profile_ele">
              <h3>{dataUser.users.fullName}</h3>
            </div>
          </div>
          <div className="profile_top follow">
            <div>
              <h6>
                Follower :<span>{dataUser.users.followers.length}</span>
              </h6>
              <h6>
                Following :<span>{dataUser.users.following.length}</span>
              </h6>
            </div>
            {
              ///605ac1bd402e2914fc318ae1 = item
              // 605ac1bd402e2914fc318ae1= user.userLogin._id

              dataUser.users.followers  &&
              dataUser.users.followers.some((item) => item == user.userLogin._id) ? (
                <button onClick={() => handleUnFollow()}>Unfollow</button>
              ) : (
                <button onClick={() => handleFollow()}>Follow</button>
              )

            }
          </div>
        </div>
      )}
    </div>
  );
}
