"use client";

import { useState, useEffect } from "react";
import { Box } from "@radix-ui/themes";
import TodoList from "./TodoList";
import TodoAddModal from "./TodoAddModal";

export interface Todo {
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

interface TodoContainerProps {
  isFriendTodo?: boolean;
  friendName?: string;
  className?: string;
}

export default function TodoContainer({
  isFriendTodo = false,
  friendName,
  className,
}: TodoContainerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(
    getMockTodos(isFriendTodo, friendName)
  );

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

  // 할일 추가 함수
  const handleAddTodo = (newTodo: {
    title: string;
    tags: string[];
    color: string;
    date: Date;
  }) => {
    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

    const todoToAdd: Todo = {
      id: newId,
      title: newTodo.title,
      completed: false,
      tags: newTodo.tags,
      color: newTodo.color,
      date: newTodo.date,
      cheerCount: 0,
      cheerleaders: [],
    };

    setTodos([...todos, todoToAdd]);
  };

  return (
    <Box className={className}>
      <TodoList
        todos={filteredTodos}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onToggleComplete={toggleComplete}
        onAddTodo={() => setIsAddModalOpen(true)}
        isFriendTodo={isFriendTodo}
        friendName={friendName}
        todoCount={filteredTodos.length}
      />

      <TodoAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
        selectedDate={selectedDate}
      />
    </Box>
  );
}

const getMockTodos = (isFriendTodo: boolean, friendName?: string): Todo[] => [
  {
    id: 1,
    title: "프로젝트 계획 수립하기",
    completed: false,
    tags: ["업무", "중요", "계획"],
    color: "#0ea5a0", // 더 진한 민트색으로 변경하여 대비 개선
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
    color: "#6c7ae0", // 더 진한 라벤더색으로 변경하여 대비 개선
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
    color: "#e07a5f", // 더 진한 살구색으로 변경하여 대비 개선
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
    color: "#6b7280", // 더 진한 회색으로 변경하여 대비 개선
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    owner: isFriendTodo ? { name: friendName || "김철수" } : undefined,
    cheerCount: 2,
    cheerleaders: [
      { id: "1", name: "김철수" },
      { id: "2", name: "이영희" },
    ],
  },
];
