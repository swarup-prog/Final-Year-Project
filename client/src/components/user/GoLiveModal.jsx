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
import axios from "axios";
import { toast } from "sonner";
import { toastSuccess } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { fetchLiveData } from "../../features/live/liveSlice";

const GoLiveModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    url: "",
  });

  const handleGoLive = async () => {
    console.log(formData);
    try {
      if (!formData.title || !formData.platform || !formData.url) {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post("/live/go-live", formData);
      if (response.status === 201) {
        toastSuccess("You are live now");
        onClose();
        dispatch(fetchLiveData());
      } else {
        console.log(response);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              <TextInput
                label={"Stream Title"}
                name={"title"}
                type={"text"}
                onChange={handleChange}
              />
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
              <TextInput
                label={"Stream URL"}
                type={"text"}
                name={"url"}
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter gap="2">
            <CustomButton onClick={handleGoLive} title={"Go Live"} />
            <CustomButton
              onClick={onClose}
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
