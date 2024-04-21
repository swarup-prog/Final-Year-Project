import CustomButton from "../buttons/CustomButton";
import {
  useDisclosure,
  Modal,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import TextInput from "../inputFields/TextInput";
import { useState } from "react";
import TimeInput from "../inputFields/TimeInput";

const GoLiveModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    url: "",
  });
  
  const handleGoLive = () => {};

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CustomButton onClick={onOpen} title={"Go Live"} />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Go Live</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-4">
              <span>{JSON.stringify(formData)}</span>
              <TextInput label={"Stream Title"} type={"text"} />
              <Select
                placeholder="Select platform"
                borderColor={"#ef4343"}
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
              >
                <option value="Twitch">Twitch</option>
                <option value="Youtube">Youtube</option>
                <option value="Tiktok">Tiktok</option>
              </Select>
              <TextInput label={"Stream URL"} type={"text"} />
            </div>
          </ModalBody>
          <ModalFooter>
            <CustomButton onClick={onClose} title={"GoLive"} />
            <CustomButton
              onClick={handleGoLive}
              title={"Close"}
              className={"bg-ternary"}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GoLiveModal;
