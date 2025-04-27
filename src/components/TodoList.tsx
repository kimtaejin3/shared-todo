"use client";

import { useState } from "react";
import DetailSvgSrc from "@/assets/icons/detail.svg";
import Image from "next/image";

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "프로젝트 계획 수립하기",
      completed: false,
      tags: ["업무", "중요", "계획"],
      color: "#D0EEEB",
    },
    {
      id: 2,
      title: "주간 회의 준비하기",
      completed: true,
      tags: ["회의", "준비", "발표"],
      color: "#E2E6FD",
    },
    {
      id: 3,
      title: "쇼핑몰 디자인 검토",
      completed: false,
      tags: ["디자인", "검토", "피드백"],
      color: "#FFF0EA",
    },
    {
      id: 4,
      title: "이메일 답장하기",
      completed: false,
      tags: ["이메일", "응답", "소통"],
      color: "#F0EDED",
    },
  ]);

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md">{formatDate()}</div>
      </div>

      <ul className=" flex flex-col gap-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-6 rounded-xl bg-gray-50 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
            style={{ border: `1.5px solid ${todo.color}` }}
          >
            <div
              className={`w-8 h-8 rounded-full ${
                todo.completed
                  ? `bg-[${todo.color}] text-white`
                  : "bg-white border-2 border-gray-300"
              } flex items-center justify-center cursor-pointer transition-colors duration-200`}
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
            <div className="flex flex-col gap-1 flex-grow">
              <div className="flex justify-between items-start">
                <span
                  className={`text-md font-semibold ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <div className="flex gap-1">
                  <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
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
                    className="text-xs bg-white text-gray-700 rounded-full px-2 py-1 hover:bg-white/80 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
