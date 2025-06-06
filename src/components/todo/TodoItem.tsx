"use client";

import { useState } from "react";
import { Box, Flex, Text, IconButton, Badge } from "@radix-ui/themes";
import DetailIcon from "@/components/shared/icons/DetailIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";

export interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    tags: string[];
    color: string;
    cheerCount?: number;
    cheerleaders?: Array<{ id: string; name: string; image?: string }>;
    date: Date;
  };
  onToggleComplete: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function TodoItem({ todo, onToggleComplete }: TodoItemProps) {
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
              className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
                todo.completed
                  ? "text-white"
                  : "bg-white border-2 border-gray-300 hover:border-gray-400"
              }`}
              style={{
                backgroundColor: todo.completed ? todo.color : undefined,
                border: todo.completed ? `none` : undefined,
              }}
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.completed && <CheckIcon />}
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
                <Flex gap="1">
                  {/* 응원 수 표시 */}
                  {todo.cheerCount && todo.cheerCount > 0 && (
                    <Flex
                      align="center"
                      className="bg-gray-100 px-2 py-1 rounded-full border border-gray-200 mr-1"
                    >
                      <Text className="text-sm mr-1">👏</Text>
                      <Text size="1" color="gray">
                        {todo.cheerCount}
                      </Text>
                    </Flex>
                  )}
                </Flex>
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
