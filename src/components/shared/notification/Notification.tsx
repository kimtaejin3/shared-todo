"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, Heading, IconButton, Avatar } from "@radix-ui/themes";
import * as Popover from "@radix-ui/react-popover";
import NotificationIcon from "@/components/shared/icons/NotificationIcon";

interface Notification {
  id: number;
  userName: string;
  todoTitle: string;
  time: string;
  read: boolean;
  color?: string;
}

export default function Notification() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 더미 알림 데이터
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      userName: "김철수",
      todoTitle: "프로젝트 계획 수립하기",
      time: "10분 전",
      read: false,
      color: "#60a5fa",
    },
    {
      id: 2,
      userName: "이영희",
      todoTitle: "주간 회의 준비하기",
      time: "1시간 전",
      read: false,
      color: "#60a5fa",
    },
    {
      id: 3,
      userName: "박지민",
      todoTitle: "쇼핑몰 디자인 검토",
      time: "2시간 전",
      read: true,
      color: "#60a5fa",
    },
    {
      id: 4,
      userName: "정민준",
      todoTitle: "이메일 답장하기",
      time: "어제",
      read: true,
      color: "#60a5fa",
    },
  ]);

  // 알림 읽음 처리
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // 커스텀 외부 클릭 핸들러 - notification과 button 모두 체크
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowNotifications(false);
    }
  };

  // document 이벤트 리스너 등록
  useEffect(() => {
    if (typeof window === "undefined" || !showNotifications) return;

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showNotifications]);

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <Popover.Root open={showNotifications} onOpenChange={setShowNotifications}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <IconButton
            ref={buttonRef}
            variant="ghost"
            radius="full"
            className="w-10 h-10 hover:bg-gray-100 transition-colors duration-200"
            aria-label="알림"
          >
            <NotificationIcon width={18} height={18} className="text-black" />
          </IconButton>
          {unreadCount > 0 && (
            <Box className="absolute -top-1 -right-1 bg-red-500 w-1.5 h-1.5 rounded-full" />
          )}
        </Box>
      </Popover.Trigger>

      <Popover.Content
        ref={notificationRef}
        align="end"
        sideOffset={5}
        className="w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden"
      >
        <Box className="p-4 border-b border-gray-100">
          <Flex justify="between" align="center">
            <Heading size="2" className="text-gray-700">
              알림
            </Heading>
            {unreadCount > 0 && (
              <IconButton
                variant="ghost"
                onClick={markAllAsRead}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-blue-50"
              >
                모두 읽음
              </IconButton>
            )}
          </Flex>
        </Box>
        <Box className="max-h-[calc(100vh-250px)] overflow-y-auto">
          {notifications.length > 0 ? (
            <Box className="list-none m-0 p-0">
              {notifications.map((notification) => (
                <Box
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    !notification.read ? "bg-blue-50/40" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
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
        {notifications.length > 0 && (
          <Box className="p-3 bg-gray-50 text-center border-t border-gray-100">
            <IconButton
              variant="ghost"
              className="text-sm text-gray-500 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              모든 알림 보기
            </IconButton>
          </Box>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}
