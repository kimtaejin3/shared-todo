"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
    owner?: {
      name: string;
      image?: string;
    };
    cheerCount?: number;
    cheerleaders?: Cheerleader[];
  };
  onClose: () => void;
  position: { top: number; left: number };
  isFriendTodo?: boolean;
}

export default function TodoDetail({
  todo,
  onClose,
  position,
  isFriendTodo = false,
}: TodoDetailProps) {
  const [showToast, setShowToast] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const [showAllCheerleaders, setShowAllCheerleaders] = useState(false);

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

  // 응원하기 버튼 클릭 핸들러
  const handleCheer = () => {
    // 실제 구현에서는 여기에 API 호출 추가
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
  };

  // 팝오버 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailRef.current &&
        !detailRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // 팝오버 위치 조정 (화면 밖으로 나가지 않도록)
  const adjustedPosition = {
    top: Math.min(position.top, window.innerHeight - 250),
    left: Math.min(position.left, window.innerWidth - 300),
  };

  // 토스트 애니메이션용 CSS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <>
      {/* 팝오버 */}
      <div
        ref={detailRef}
        className="fixed bg-white rounded-xl shadow-lg border border-gray-100 z-20 w-72"
        style={{
          top: `${adjustedPosition.top}px`,
          left: `${adjustedPosition.left}px`,
          transform: "translate(-90%, -100%)",
        }}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 pr-6">
              {todo.title}
            </h3>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {isFriendTodo && todo.owner && (
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: todo.color }}
              >
                {todo.owner.name.charAt(0)}
              </div>
              <span className="text-sm text-gray-600">
                {todo.owner.name}의 할 일
              </span>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {todo.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-50 text-gray-600 rounded-full px-2.5 py-1 border border-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span
              className={`flex items-center text-sm ${
                todo.completed ? "text-green-500" : "text-gray-500"
              }`}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                  todo.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              {todo.completed ? "완료됨" : "진행 중"}
            </span>
            <span className="text-xs text-gray-500">
              {todo.date.toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* 나의 투두에만 표시되는 응원 정보 섹션 */}
          {!isFriendTodo && cheerCount > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">👏</span>
                <span className="text-sm font-medium text-gray-700">
                  {cheerCount}명이 응원했습니다
                </span>
              </div>

              <div className="flex flex-wrap">
                {/* 응원자 아바타 표시 (최대 5명) */}
                <div className="flex -space-x-2 mb-1">
                  {cheerleaders.slice(0, 5).map((cheerleader, index) => (
                    <div
                      key={cheerleader.id}
                      className="w-6 h-6 rounded-full bg-blue-100 border border-white flex items-center justify-center text-xs font-medium text-blue-600"
                      title={cheerleader.name}
                    >
                      {cheerleader.name.charAt(0)}
                    </div>
                  ))}

                  {/* 표시되지 않은 응원자가 더 있는 경우 */}
                  {cheerleaders.length > 5 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs font-medium text-gray-700">
                      +{cheerleaders.length - 5}
                    </div>
                  )}
                </div>

                {/* 응원자 목록 토글 버튼 */}
                {cheerleaders.length > 0 && (
                  <button
                    onClick={() => setShowAllCheerleaders(!showAllCheerleaders)}
                    className="text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors w-full text-left"
                  >
                    {showAllCheerleaders ? "접기" : "응원한 친구 모두 보기"}
                  </button>
                )}

                {/* 응원자 전체 목록 (토글 시 표시) */}
                {showAllCheerleaders && (
                  <div className="w-full mt-2 bg-gray-50 p-2 rounded-lg">
                    <ul className="text-xs text-gray-600 space-y-1">
                      {cheerleaders.map((cheerleader) => (
                        <li
                          key={cheerleader.id}
                          className="flex items-center gap-1.5"
                        >
                          <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-600">
                            {cheerleader.name.charAt(0)}
                          </span>
                          <span>{cheerleader.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {isFriendTodo && (
          <div className="p-3 bg-gray-50">
            <button
              onClick={handleCheer}
              className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">👏</span>
              응원하기
            </button>
          </div>
        )}
      </div>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center gap-2.5">
          <span className="text-xl">👏</span>
          <div>
            <p className="font-medium">응원했습니다!</p>
            <p className="text-xs text-gray-300 mt-0.5">
              친구에게 알림이 전송되었습니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
