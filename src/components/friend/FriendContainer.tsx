"use client";

import MockImageSrc from "@/assets/images/mock_image.jpeg";
import { useState } from "react";
import FriendAddModal from "./FriendAddModal";
import FriendList from "./FriendList";
import AddButton from "@/components/shared/ui/buttons/AddButton";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { Friend } from "@/types/friend";

// 더미 친구 데이터
const FRIENDS: Friend[] = [
  { id: "1", name: "김철수", image: MockImageSrc },
  { id: "2", name: "이영희", image: null },
  { id: "3", name: "박지민", image: null },
  { id: "4", name: "정민준", image: null },
  { id: "5", name: "최영희", image: null },
  { id: "6", name: "강승호", image: null },
  { id: "7", name: "윤서아", image: null },
  { id: "8", name: "임지훈", image: null },
  { id: "9", name: "한수민", image: null },
];

export default function FriendContainer() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [friends, setFriends] = useState(FRIENDS);

  // 친구 추가 핸들러
  const handleAddFriend = (friendId: string) => {
    // 실제 구현에서는 API 호출을 통해 친구 요청을 전송합니다.
    console.log(`친구 추가 요청: ${friendId}`);

    // 현재는 데모를 위한 더미 데이터 추가
    const newFriend: Friend = {
      id: `new-${Date.now()}`,
      name: friendId,
      image: null,
    };

    setFriends([...friends, newFriend]);
  };

  return (
    <Flex direction="column" gap="4" width="100%">
      <Flex justify="between" align="center" width="100%">
        <Heading as="h3" size="3" color="gray">
          내 친구들
        </Heading>
        <AddButton onClick={() => setIsAddModalOpen(true)} label="친구 추가" />
      </Flex>

      <Box className="border border-gray-200 p-3 rounded-xl">
        <FriendList friends={friends} />
      </Box>

      <FriendAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddFriend}
      />
    </Flex>
  );
}
