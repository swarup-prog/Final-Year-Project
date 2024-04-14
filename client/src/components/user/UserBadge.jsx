import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadge = ({ user, onDelete }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      bg={"#ef4343"}
      cursor="pointer"
      onClick={onDelete}
    >
      {user.name}

      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadge;
