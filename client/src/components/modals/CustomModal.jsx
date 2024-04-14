import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  Tooltip,
} from "@chakra-ui/react";
import CustomButton from "../buttons/CustomButton";

const CustomModal = ({ children, icon, title, background, className }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomButton title={title} onClick={onOpen} />

      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalHeader>{title}</ModalHeader>
        <ModalContent p={5} justifyContent={"center"}>
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
