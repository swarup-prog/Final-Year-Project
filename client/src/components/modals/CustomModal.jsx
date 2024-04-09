import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  Tooltip,
} from "@chakra-ui/react";

import { ReactElement, ReactNode } from "react";

const CustomModal = ({ children, icon, title, tooltipTitle, background }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label={tooltipTitle} aria-label="Notification">
        <Button
          onClick={onOpen}
          leftIcon={icon}
          bg={background ?? "transparent"}
        >
          {title}
        </Button>
      </Tooltip>

      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
