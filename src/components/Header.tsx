"use client";

import Image from "next/image";
import LogoImgSrc from "@/assets/logo.png";
import NotificationSvgSrc from "@/assets/icons/notification.svg";
import UserSvgSrc from "@/assets/icons/user.svg";
import { useState, useRef, useEffect } from "react";

interface Notification {
  id: number;
  userName: string;
  todoTitle: string;
  time: string;
  read: boolean;
}

export default function Header() {
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
    },
    {
      id: 2,
      userName: "이영희",
      todoTitle: "주간 회의 준비하기",
      time: "1시간 전",
      read: false,
    },
    {
      id: 3,
      userName: "박지민",
      todoTitle: "쇼핑몰 디자인 검토",
      time: "2시간 전",
      read: true,
    },
    {
      id: 4,
      userName: "정민준",
      todoTitle: "이메일 답장하기",
      time: "어제",
      read: true,
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

  // 팝오버 외부 클릭 감지하여 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="flex items-center">
        <Image src={LogoImgSrc} alt="Logo" width={32} height={32} />
        <span className="sr-only">Shared Todo App</span>
      </h1>
      <div className="flex items-center gap-1">
        <div className="relative">
          <button
            ref={buttonRef}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Image
              src={NotificationSvgSrc}
              alt="Notification"
              width={14}
              height={14}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              ref={notificationRef}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-md font-semibold text-gray-700">알림</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    모두 읽음 처리
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <ul>
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-500 font-bold">
                            {notification.userName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">
                                {notification.userName}
                              </span>
                              님이 내 "
                              <span className="font-medium">
                                {notification.todoTitle}
                              </span>
                              "을 응원합니다!
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    새로운 알림이 없습니다
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
          <Image src={UserSvgSrc} alt="User" width={14} height={14} />
        </button>
      </div>
    </header>
  );
}
