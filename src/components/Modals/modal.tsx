import { Modal, ModalContent } from "@nextui-org/react";
import { ReactNode } from "react";
const DefaultModal = ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: any;
}) => {
  return (
    <Modal
      placement="center"
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={true}
      className="rounded-none w-[23rem] md:w-[28rem]"
    >
      <ModalContent className="rounded-[12px] py-2">{children}</ModalContent>
    </Modal>
  );
};
export default DefaultModal;
