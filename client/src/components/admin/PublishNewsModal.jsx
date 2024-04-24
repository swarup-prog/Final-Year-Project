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
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { toastSuccess } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveData } from "../../features/live/liveSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const PublishNewsModal = () => {
  const games = useSelector((state) => state.games.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    game: "",
    content: "",
  });

  const handlePublishNews = async () => {
    try {
      if (!formData.title || !formData.game || !formData.content) {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post("/news/publish", formData);
      if (response.status === 200) {
        toastSuccess(response.data.message);
        onClose();
        // dispatch(fetchLiveData());
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
      <CustomButton onClick={onOpen} title={"Publish"} />

      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Publish News</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-4">
              <TextInput
                label={"News Title"}
                name={"title"}
                type={"text"}
                onChange={handleChange}
              />
              <Select
                placeholder="Select game"
                borderColor={"#ef4343"}
                name="game"
                value={formData.game}
                onChange={(e) =>
                  setFormData({ ...formData, game: e.target.value })
                }
              >
                {games?.map((game) => (
                  <option value={game?._id} key={game?._id}>
                    {game?.name}
                  </option>
                ))}
              </Select>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(newValue) =>
                  setFormData({ ...formData, content: newValue })
                }
                modules={modules}
                formats={formats}
                style={{
                  height: "400px",
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter gap="2" m={35}>
            <CustomButton onClick={handlePublishNews} title={"Publish"} />
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

export default PublishNewsModal;
