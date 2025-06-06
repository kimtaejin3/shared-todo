"use client";

import { useState } from "react";
import { Box, Flex, Text, Badge } from "@radix-ui/themes";
import CheckIcon from "@/components/shared/icons/CheckIcon";
import ClockIcon from "@/components/shared/icons/ClockIcon";

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
                <button>응원하기</button>
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
    </Box>
  );
}
