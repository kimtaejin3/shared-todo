"use client";

import Image from "next/image";
import LogoImgSrc from "@/assets/images/logo.png";
import NotificationSvgSrc from "@/assets/icons/notification.svg";
import UserSvgSrc from "@/assets/icons/user.svg";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Notification {
  id: number;
  userName: string;
  todoTitle: string;
  time: string;
  read: boolean;
  color?: string;
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
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="cursor-pointer">
        <h1 className="flex items-center">
          <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
            <Image
              src={LogoImgSrc}
              alt="Logo"
              width={20}
              height={20}
              className="brightness-0 invert"
            />
          </div>
          <span className="sr-only">Shared Todo App</span>
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            ref={buttonRef}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Image
              src={NotificationSvgSrc}
              alt="Notification"
              width={16}
              height={16}
            />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 w-1.5 h-1.5 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div
              ref={notificationRef}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-base font-semibold text-gray-700">알림</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-blue-50"
                  >
                    모두 읽음
                  </button>
                )}
              </div>
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                {notifications.length > 0 ? (
                  <ul>
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                          !notification.read ? "bg-blue-50/40" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-sm"
                            style={{
                              backgroundColor: notification.color || "#c0c0c0",
                            }}
                          >
                            {notification.userName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 leading-snug">
                              <span className="font-semibold">
                                {notification.userName}
                              </span>
                              님이 내 "
                              <span className="font-medium">
                                {notification.todoTitle}
                              </span>
                              "을 응원합니다!
                            </p>
                            <div className="flex justify-between items-center mt-1.5">
                              <p className="text-xs text-gray-400">
                                {notification.time}
                              </p>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-12 px-4 text-center">
                    <div className="text-gray-300 text-4xl mb-2">🔔</div>
                    <p className="text-gray-500 font-medium">
                      새로운 알림이 없습니다
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      다른 사용자가 당신의 할 일을 응원하면 여기에 표시됩니다
                    </p>
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                  <button className="text-sm text-gray-500 hover:text-blue-500 font-medium transition-colors duration-200">
                    모든 알림 보기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <Link href="/profile">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
            <Image src={UserSvgSrc} alt="User" width={16} height={16} />
          </button>
        </Link>
      </div>
    </header>
  );
}
