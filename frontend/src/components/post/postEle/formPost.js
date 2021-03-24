import {useState} from 'react';

import { useSelector ,useDispatch } from 'react-redux';
import { createPost } from '../../../actions/posts/postAction';
export default  function FormPostElement({isModalVisible,setIsModalVisible}) {
    const [title, setTitle] = useState('')

    const userSignin = useSelector((state) => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch()
    const handlePost = (e) =>{
        e.preventDefault();
        const idUser = userInfo.userLogin._id
        dispatch(createPost({title ,idUser }))
        setTitle('');
        setIsModalVisible(false)
    }
    return <div className='form_post border_d'>
      <div className="form_postContainer ">
            <p>New Post</p>
            <input value={title}
                   onChange={e => setTitle(e.target.value)}
                   type='text'
                   placeholder='What is on your mind?'
                    >
            </input>
            <button onClick={handlePost}>
                Post
            </button>
      </div>
    </div>
  }


