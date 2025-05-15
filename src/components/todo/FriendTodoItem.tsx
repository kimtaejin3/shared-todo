"use client";

import { useState } from "react";
import { Box, Flex, Text, IconButton, Badge } from "@radix-ui/themes";
import DetailIcon from "@/components/shared/icons/DetailIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";
import ClockIcon from "@/components/shared/icons/ClockIcon";
import TodoDetail from "./TodoDetail";
import FriendTodoDetail from "./FriendTodoDetail";

export interface FriendTodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    tags: string[];
    color: string;
    date: Date;
    owner?: {
      name: string;
      image?: string;
    };
  };
  onToggleComplete?: (id: number) => void;
}

export default function FriendTodoItem({
  todo,
  onToggleComplete,
}: FriendTodoItemProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  return (
    <Box className="relative">
      <Box
        className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        asChild
      >
        <li>
          <Flex gap="4" align="start">
            <Flex
              align="center"
              justify="center"
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                todo.completed
                  ? "text-white bg-green-500"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {todo.completed ? <CheckIcon /> : <ClockIcon />}
            </Flex>

            <Flex direction="column" gap="2" className="flex-grow">
              <Flex justify="between" align="start">
                <Text
                  size="3"
                  weight="medium"
                  className={`${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {todo.title}
                </Text>
                <IconButton
                  size="1"
                  variant="ghost"
                  color="gray"
                  onClick={handleDetailClick}
                  aria-label="상세 정보 보기"
                  className="hover:text-blue-500 transition-all duration-200"
                >
                  <DetailIcon width={20} height={20} />
                </IconButton>
              </Flex>
              <Flex align="center" gap="2" wrap="wrap">
                {todo.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="surface"
                    radius="full"
                    color="gray"
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    #{tag}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </li>
      </Box>

      <FriendTodoDetail todo={todo} open={showDetail} onClose={closeDetail} />
    </Box>
  );
}
