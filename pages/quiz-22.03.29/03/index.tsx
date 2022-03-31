import { useState } from "react";
import { Modal, Button } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleComplete = (data: any) => {
    console.log(data.address);
    setIsOpen(false);
    setAddress(data.address);
  };

  return (
    <>
      <Button onClick={showModal}>모달 열기</Button>

      {/* 모달 삭제하고 새로 만드는 방법 */}
      {isOpen && (
        <Modal
          title="주소검색"
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
      <div>{address}</div>
    </>
  );
}
