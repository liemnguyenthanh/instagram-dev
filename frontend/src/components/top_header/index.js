
import { useSelector } from 'react-redux';
import { Link,useHistory } from 'react-router-dom'
import styled from 'styled-components'

const TopContainer = styled.div`
    max-width :1400px;
    height: 50px;
    border-bottom:1px solid #ccc;
`

export default  function TopHeader() {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const history = useHistory();
  const hanhleSignout= (e) =>{
    e.preventDefault();
    localStorage.clear('userInfo');
    window.location.href = '/signin';

  }
  return <TopContainer>
    <div className=" container">
       <div className="topwrap">
       <div className="wrapp_img">
          <Link to="/">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" srcset=""/>

          </Link>
        </div>
        <div className="search_top">

        </div>
        <div className="top_button_login">
          {
            userInfo ?
            <>
            <span>{userInfo.userLogin.fullName}</span>
            <button>
             <Link to={'/profile/'+userInfo.userLogin._id}>
             Profile
             </Link>
            </button>
            <button onClick={hanhleSignout}>
              sign out
            </button>
            </>
            :
            <Link to='/signin'>
            login
            </Link>
          }

        </div>
       </div>
    </div>
  </TopContainer>
}


