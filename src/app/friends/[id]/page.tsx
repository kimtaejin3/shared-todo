"use client";

import { useParams } from "next/navigation";
import Header from "@/components/shared/Header";
import TodoContainer from "@/components/todo/TodoContainer";
import FriendNotFound from "@/components/friend/FriendNotFound";
import { useEffect, useState } from "react";
import { Box, Flex, Text, Heading, Avatar } from "@radix-ui/themes";

// 더미 친구 데이터
const FRIENDS = [
  { id: "1", name: "김철수" },
  { id: "2", name: "이영희" },
  { id: "3", name: "박지민" },
  { id: "4", name: "정민준" },
];

export default function FriendTodoPage() {
  const params = useParams();
  const [friendName, setFriendName] = useState<string | null>(null);

  useEffect(() => {
    const friendId = params.id as string;
    const friend = FRIENDS.find((f) => f.id === friendId);
    setFriendName(friend?.name || null);
  }, [params.id]);

  if (!friendName) {
    return <FriendNotFound />;
  }

  return (
    <Box className="max-w-[670px] mx-auto pb-14 px-4">
      <Header />
      <Box className="mt-6 mb-8">
        <Flex className="items-center gap-3 mb-2">
          <Avatar
            fallback={friendName.charAt(0)}
            className="w-10 h-10 bg-blue-100 text-blue-600 font-bold"
          />
          <Heading as="h1" size="5">
            {friendName}님의 할 일 목록
          </Heading>
        </Flex>
        <Text size="2" color="gray">
          {friendName}님의 투두리스트입니다. 응원 버튼을 눌러 친구를
          응원해보세요!
        </Text>
      </Box>

      <TodoContainer isFriendTodo={true} friendName={friendName} />
    </Box>
  );
}
