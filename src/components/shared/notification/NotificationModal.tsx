"use client";

import { useRef } from "react";
import { Box, Flex, Text, Heading, IconButton, Avatar } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import { useFadeIn } from "@/hooks/useAnimation";
import { useModalEvents } from "@/hooks/useModalEvents";

interface Notification {
  id: number;
  userName: string;
  todoTitle: string;
  time: string;
  read: boolean;
  color?: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const fadeInClass = useFadeIn();

  // 모달 이벤트(외부 클릭, ESC 키) 처리
  useModalEvents(modalRef, isOpen, onClose);

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Flex align="center" justify="center" className="fixed inset-0 z-50 px-4">
          <Dialog.Content asChild>
            <Box
              ref={modalRef}
              className={`w-full max-w-lg p-0 shadow-xl bg-white rounded-2xl ${fadeInClass} overflow-hidden`}
            >
              <Box className="p-4 border-b border-gray-100">
                <Flex justify="between" align="center">
                  <Heading size="4" className="text-gray-800 font-bold">
                    모든 알림
                  </Heading>
                  <Flex gap="2">
                    {unreadCount > 0 && (
                      <IconButton
                        variant="ghost"
                        onClick={onMarkAllAsRead}
                        className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-blue-50"
                      >
                        모두 읽음
                      </IconButton>
                    )}
                    <Dialog.Close asChild>
                      <IconButton
                        variant="ghost"
                        className="rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="닫기"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Dialog.Close>
                  </Flex>
                </Flex>
              </Box>

              <Box className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {notifications.length > 0 ? (
                  <Box className="list-none m-0 p-0">
                    {notifications.map((notification) => (
                      <Box
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                          !notification.read ? "bg-blue-50/40" : ""
                        }`}
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <Flex gap="3" align="start">
                          <Avatar
                            fallback={notification.userName.charAt(0)}
                            radius="full"
                            size="2"
                            className="flex-shrink-0 font-bold text-white shadow-sm"
                            style={{
                              backgroundColor: notification.color || "#c0c0c0",
                            }}
                          />
                          <Box className="flex-1">
                            <Text size="2" className="text-gray-700 leading-snug">
                              <Text weight="bold" className="text-gray-700">
                                {notification.userName}
                              </Text>
                              님이 내 "
                              <Text weight="medium">{notification.todoTitle}</Text>
                              "을 응원합니다!
                            </Text>
                            <Flex justify="between" align="center" mt="1">
                              <Text size="1" className="text-gray-400">
                                {notification.time}
                              </Text>
                              {!notification.read && (
                                <Box className="w-2 h-2 rounded-full bg-red-500" />
                              )}
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box className="py-12 px-4 text-center">
                    <Box className="text-gray-300 text-4xl mb-2">🔔</Box>
                    <Text weight="medium" className="text-gray-500">
                      새로운 알림이 없습니다
                    </Text>
                    <Text size="1" className="text-gray-400 mt-1">
                      다른 사용자가 당신의 할 일을 응원하면 여기에 표시됩니다
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Dialog.Content>
        </Flex>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
