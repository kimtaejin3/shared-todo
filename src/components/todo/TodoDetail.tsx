"use client";

import { useState, useRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Button from "@/components/shared/ui/buttons/Button";
import { Box, Flex, Text, Badge, IconButton } from "@radix-ui/themes";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import EditIcon from "@/components/shared/icons/EditIcon";
import DeleteIcon from "@/components/shared/icons/DeleteIcon";

interface Cheerleader {
  id: string;
  name: string;
  image?: string;
}

interface TodoDetailProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    tags: string[];
    color: string;
    date: Date;
    cheerCount?: number;
    cheerleaders?: Cheerleader[];
  };
  open: boolean;
  onEdit?: (todoId: number) => void;
  onClose: () => void;
  onDelete?: (todoId: number) => void;
}

export default function TodoDetail({
  todo,
  open,
  onClose,
  onEdit,
  onDelete,
}: TodoDetailProps) {
  const [showAllCheerleaders, setShowAllCheerleaders] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(todo.id);
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(todo.id);
      onClose();
    }
  };

  // 더미 응원자 데이터 (실제 구현에서는 todo에서 받아와야 함)
  const dummyCheerleaders: Cheerleader[] = [
    { id: "1", name: "김철수" },
    { id: "2", name: "이영희" },
    { id: "3", name: "박지민" },
    { id: "4", name: "정민준" },
    { id: "5", name: "최영희" },
  ];

  // 응원자 목록 (props로 받거나 더미 데이터 사용)
  const cheerleaders = todo.cheerleaders || dummyCheerleaders;
  const cheerCount = todo.cheerCount || cheerleaders.length;

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(open) => !open && onClose()}
    >
      <PopoverPrimitive.Anchor className="absolute right-0 bottom-20" />
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="bg-white rounded-xl shadow-lg border border-gray-100 z-20 w-72 animate-fadeIn"
          sideOffset={5}
          align="end"
          side="bottom"
        >
          <Box className="p-4 border-b border-gray-100">
            <Flex justify="between" align="start">
              <Text className="text-lg font-semibold text-gray-800 pr-6">
                {todo.title}
              </Text>
              <IconButton
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                variant="ghost"
                color="gray"
                aria-label="닫기"
              >
                <CloseIcon />
              </IconButton>
            </Flex>

            <Flex wrap="wrap" gap="1.5" className="mt-3">
              {todo.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="surface"
                  radius="full"
                  color="gray"
                  className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 border border-gray-100"
                >
                  #{tag}
                </Badge>
              ))}
            </Flex>

            <Flex align="center" justify="between" className="mt-3">
              <Flex
                align="center"
                className={todo.completed ? "text-green-500" : "text-gray-500"}
              >
                <Box
                  className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                    todo.completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <Text size="2">{todo.completed ? "완료됨" : "진행 중"}</Text>
              </Flex>
              <Text size="1" color="gray">
                {todo.date.toLocaleDateString("ko-KR", {
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Flex>

            {/* 응원 정보 섹션 */}
            {cheerCount > 0 && (
              <Box className="mt-4 pt-3 border-t border-gray-100">
                <Flex align="center" gap="2" className="mb-2">
                  <Text className="text-lg">👏</Text>
                  <Text size="2" weight="medium" color="gray">
                    {cheerCount}명이 응원했습니다
                  </Text>
                </Flex>

                <Flex direction="column">
                  {/* 응원자 아바타 표시 (최대 5명) */}
                  <Flex className="-space-x-2 mb-1">
                    {cheerleaders.slice(0, 5).map((cheerleader, index) => (
                      <Box
                        key={cheerleader.id}
                        className="w-6 h-6 rounded-full bg-blue-100 border border-white flex items-center justify-center text-xs font-medium text-blue-600"
                        title={cheerleader.name}
                      >
                        {cheerleader.name.charAt(0)}
                      </Box>
                    ))}

                    {/* 표시되지 않은 응원자가 더 있는 경우 */}
                    {cheerleaders.length > 5 && (
                      <Box className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs font-medium text-gray-700">
                        +{cheerleaders.length - 5}
                      </Box>
                    )}
                  </Flex>

                  {/* 응원자 목록 토글 버튼 */}
                  {cheerleaders.length > 0 && (
                    <Button
                      onClick={() =>
                        setShowAllCheerleaders(!showAllCheerleaders)
                      }
                      className="text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors w-full text-left"
                    >
                      {showAllCheerleaders ? "접기" : "응원한 친구 모두 보기"}
                    </Button>
                  )}

                  {/* 응원자 전체 목록 (토글 시 표시) */}
                  {showAllCheerleaders && (
                    <Box className="w-full mt-2 bg-gray-50 p-2 rounded-lg">
                      <Box className="text-xs text-gray-600 space-y-1">
                        {cheerleaders.map((cheerleader) => (
                          <Box
                            key={cheerleader.id}
                            className="flex items-center gap-1.5"
                          >
                            <Box className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-600">
                              {cheerleader.name.charAt(0)}
                            </Box>
                            <Text size="1">{cheerleader.name}</Text>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Flex>
              </Box>
            )}
          </Box>

          <Box className="p-3 bg-gray-50">
            <Flex gap="2">
              <Button
                onClick={handleEdit}
                variant="primary"
                className="flex-1"
                icon={<EditIcon />}
              >
                수정
              </Button>
              <Button
                onClick={handleDelete}
                variant="primary"
                className="flex-1"
                icon={<DeleteIcon />}
              >
                삭제
              </Button>
            </Flex>
          </Box>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
