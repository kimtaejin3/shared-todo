"use client";

import { useState } from "react";
import { Box, Flex, Text, IconButton, Badge } from "@radix-ui/themes";
import DetailIcon from "@/components/shared/icons/DetailIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";
import ClockIcon from "@/components/shared/icons/ClockIcon";
import TodoDetail from "./TodoDetail";

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
    owner?: {
      name: string;
      image?: string;
    };
  };
  isFriendTodo?: boolean;
  onToggleComplete: (id: number) => void;
}

export default function TodoItem({
  todo,
  isFriendTodo = false,
  onToggleComplete,
}: TodoItemProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  
  // 디테일 버튼 클릭 핸들러
  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // 버튼 위치 기준으로 팝오버 위치 결정
    const rect = e.currentTarget.getBoundingClientRect();
    setDetailPosition({
      top: rect.top,
      left: rect.left,
    });

    setShowDetail(true);
  };

  // 디테일 팝오버 닫기
  const closeDetail = () => {
    setShowDetail(false);
  };
  
  const renderTodoItem = () => (
    <Box
      className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
      asChild
    >
      <li>
        <Flex gap="4" align="start">
          {!isFriendTodo && (
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
          )}

          {isFriendTodo && (
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
          )}

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
                {/* 내 투두인 경우 응원 수 표시 */}
                {!isFriendTodo && todo.cheerCount && todo.cheerCount > 0 && (
                  <Flex align="center" className="bg-gray-100 px-2 py-1 rounded-full border border-gray-200 mr-1">
                    <Text className="text-sm mr-1">👏</Text>
                    <Text size="1" color="gray">
                      {todo.cheerCount}
                    </Text>
                  </Flex>
                )}
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
  );
  
  return (
    <>
      {renderTodoItem()}
      
      {/* 디테일 팝오버 */}
      {showDetail && (
        <TodoDetail
          todo={todo}
          onClose={closeDetail}
          position={detailPosition}
          isFriendTodo={isFriendTodo}
        />
      )}
    </>
  );
}
