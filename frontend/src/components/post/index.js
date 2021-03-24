import { useEffect, useState } from "react";

import StoryComponent from "../story";
import PostElement from "./postEle";
import FormPostElement from "./postEle/formPost";

import Spin from "../spin";
import { Modal, Button } from "antd";
import AllPostEle from "./allpost";

export default function PostComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="postComponent">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="story_main">
              <Button type="primary" onClick={showModal}>
                New Post
              </Button>
              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormPostElement isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
              </Modal>
            </div>
            <AllPostEle />
          </div>
          <div className="col-md5">
            <div className="suggest"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
