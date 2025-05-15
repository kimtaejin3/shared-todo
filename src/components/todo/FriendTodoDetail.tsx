"use client";

import { useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useToastFadeIn } from "@/hooks/useAnimation";
import Button from "@/components/shared/ui/buttons/Button";
import { Box, Flex, Text, Badge, IconButton } from "@radix-ui/themes";
import CloseIcon from "@/components/shared/icons/CloseIcon";

interface Cheerleader {
  id: string;
  name: string;
  image?: string;
}

interface FriendTodoDetailProps {
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
  open: boolean;
  onClose: () => void;
}

export default function FriendTodoDetail({
  todo,
  open,
  onClose,
}: FriendTodoDetailProps) {
  const [showToast, setShowToast] = useState(false);
  const toastFadeInClass = useToastFadeIn();

  const handleCheer = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
  };

  return (
    <>
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

          {todo.owner && (
            <Flex align="center" gap="2" className="mt-2">
              <Box
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: todo.color }}
              >
                {todo.owner.name.charAt(0)}
              </Box>
              <Text className="text-sm text-gray-600">
                {todo.owner.name}의 할 일
              </Text>
            </Flex>
          )}

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
        </Box>

        <Box className="p-3 bg-gray-50">
          <Button
            onClick={handleCheer}
            variant="primary"
            fullWidth
            icon={<span className="text-lg">👏</span>}
          >
            응원하기
          </Button>
        </Box>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {/* 토스트 메시지 */}
      {showToast && (
        <Box
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2.5 ${toastFadeInClass}`}
        >
          <Text className="text-xl">👏</Text>
          <Box>
            <Text className="font-medium">응원했습니다!</Text>
            <Text className="text-xs text-gray-300 mt-0.5">
              친구에게 알림이 전송되었습니다.
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
}
