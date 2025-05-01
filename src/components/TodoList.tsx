"use client";

import { useState, useEffect, useRef } from "react";
import DetailSvgSrc from "@/assets/icons/detail.svg";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import TodoDetail from "./TodoDetail";

// DatePicker 커스텀 스타일
import "./date-picker-custom.css";

interface Todo {
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
  cheerleaders?: Array<{ id: string; name: string; image?: string }>;
}

interface TodoListProps {
  isFriendTodo?: boolean;
  friendName?: string;
}

export default function TodoList({
  isFriendTodo = false,
  friendName,
}: TodoListProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "프로젝트 계획 수립하기",
      completed: false,
      tags: ["업무", "중요", "계획"],
      color: "#d0eeeb",
      date: new Date(),
      owner: isFriendTodo ? { name: friendName || "김철수" } : undefined,
      cheerCount: 3,
      cheerleaders: [
        { id: "1", name: "김철수" },
        { id: "2", name: "이영희" },
        { id: "3", name: "박지민" },
      ],
    },
    {
      id: 2,
      title: "주간 회의 준비하기",
      completed: true,
      tags: ["회의", "준비", "발표"],
      color: "#E2E6FD",
      date: new Date(),
      owner: isFriendTodo ? { name: friendName || "김철수" } : undefined,
      cheerCount: 5,
      cheerleaders: [
        { id: "1", name: "김철수" },
        { id: "2", name: "이영희" },
        { id: "3", name: "박지민" },
        { id: "4", name: "정민준" },
        { id: "5", name: "최영희" },
      ],
    },
    {
      id: 3,
      title: "쇼핑몰 디자인 검토",
      completed: false,
      tags: ["디자인", "검토", "피드백"],
      color: "#FFF0EA",
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      owner: isFriendTodo ? { name: friendName || "김철수" } : undefined,
      cheerCount: 0,
      cheerleaders: [],
    },
    {
      id: 4,
      title: "이메일 답장하기",
      completed: false,
      tags: ["이메일", "응답", "소통"],
      color: "#F0EDED",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      owner: isFriendTodo ? { name: friendName || "김철수" } : undefined,
      cheerCount: 2,
      cheerleaders: [
        { id: "1", name: "김철수" },
        { id: "2", name: "이영희" },
      ],
    },
  ]);

  // 필터링된 할 일 목록
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  // 날짜가 변경될 때마다 할 일 목록을 필터링
  useEffect(() => {
    const filtered = todos.filter(
      (todo) =>
        todo.date.getDate() === selectedDate.getDate() &&
        todo.date.getMonth() === selectedDate.getMonth() &&
        todo.date.getFullYear() === selectedDate.getFullYear()
    );
    setFilteredTodos(filtered);
  }, [selectedDate, todos]);

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  // 디테일 버튼 클릭 핸들러
  const handleDetailClick = (
    todo: Todo,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    // 버튼 위치 기준으로 팝오버 위치 결정
    const rect = e.currentTarget.getBoundingClientRect();
    setDetailPosition({
      top: rect.top,
      left: rect.left,
    });

    setSelectedTodo(todo);
  };

  // 디테일 팝오버 닫기
  const closeDetail = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xs">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => date && setSelectedDate(date)}
              dateFormat="yyyy년 MM월 dd일"
              locale={ko}
              className="bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-gray-700 font-medium cursor-pointer hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
              showPopperArrow={false}
              calendarClassName="custom-datepicker"
              dayClassName={(date) =>
                date &&
                format(date, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd")
                  ? "selected-day"
                  : ""
              }
              popperClassName="custom-popper"
              popperPlacement="bottom-start"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 10L12 6H4L8 10Z" fill="#9CA3AF" />
              </svg>
            </div>
          </div>
          <span className="text-gray-500 text-sm flex-shrink-0">
            {filteredTodos.length > 0
              ? `${filteredTodos.length}개의 할 일이 있습니다`
              : "할 일이 없습니다"}
          </span>
        </div>

        {isFriendTodo && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm">
              {friendName?.charAt(0) || "K"}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {friendName || "김철수"}님의 할 일
            </span>
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="p-6 rounded-xl bg-white flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
              style={{ borderLeft: `4px solid ${todo.color}` }}
            >
              {!isFriendTodo && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    todo.completed
                      ? "text-white"
                      : "bg-white border-2 border-gray-300 hover:border-gray-400"
                  }`}
                  style={{
                    backgroundColor: todo.completed ? todo.color : undefined,
                    border: todo.completed ? `none` : undefined,
                  }}
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.completed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}

              {isFriendTodo && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    todo.completed
                      ? "text-white bg-green-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {todo.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-md font-semibold ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.title}
                  </span>
                  <div className="flex gap-1">
                    {/* 내 투두인 경우 응원 수 표시 */}
                    {!isFriendTodo &&
                      todo.cheerCount &&
                      todo.cheerCount > 0 && (
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full border border-gray-100 mr-1">
                          <span className="text-sm mr-1">👏</span>
                          <span className="text-xs text-gray-500">
                            {todo.cheerCount}
                          </span>
                        </div>
                      )}
                    <button
                      className="text-gray-400 p-1 rounded-full hover:bg-gray-100 hover:text-blue-500 transition-all duration-200"
                      onClick={(e) => handleDetailClick(todo, e)}
                    >
                      <Image
                        src={DetailSvgSrc}
                        alt="Detail"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-50 text-gray-600 rounded-full px-3 py-1 border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="text-gray-400 mb-2">📅</div>
            <div className="text-gray-500 font-medium">
              이 날짜에 할 일이 없습니다
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {isFriendTodo
                ? "다른 날짜를 선택해보세요"
                : "새로운 할 일을 추가해보세요"}
            </div>
          </div>
        )}
      </ul>

      {/* 디테일 팝오버 */}
      {selectedTodo && (
        <TodoDetail
          todo={selectedTodo}
          onClose={closeDetail}
          position={detailPosition}
          isFriendTodo={isFriendTodo}
        />
      )}
    </div>
  );
}
