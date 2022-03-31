import { useState } from "react";
import { Modal, Button } from "antd";

export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Button onClick={showModal}>모달 열기</Button>
      <Modal
        title="게시글 등록"
        visible={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        게시글이 등록되었습니다.
      </Modal>
    </>
  );
}
