"use client";

import { useState, useEffect } from "react";
import DetailIcon from "@/components/shared/icons/DetailIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";
import ClockIcon from "@/components/shared/icons/ClockIcon";
import Image from "next/image";
import TodoDetail from "./TodoDetail";
import TodoAddModal from "./TodoAddModal";
import AddButton from "@/components/shared/ui/buttons/AddButton";
import { Box, Card, Flex, Text, Heading, IconButton, Badge } from "@radix-ui/themes";

import "@/styles/date-picker-custom.css";
import DatePicker from "../shared/DatePicker";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([
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
    <Box>
      <Flex 
        justify="between" 
        align="center" 
        mb="6" 
        className="max-[490px]:flex-col max-[490px]:items-start gap-4"
      >
        <Flex align="center" gap="3">
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Text size="2" color="gray" className="flex-shrink-0">
            {filteredTodos.length > 0
              ? `${filteredTodos.length}개의 할 일이 있습니다`
              : "할 일이 없습니다"}
          </Text>
        </Flex>

        {!isFriendTodo && (
          <AddButton
            onClick={() => setIsAddModalOpen(true)}
            label="할 일 추가"
          />
        )}

        {isFriendTodo && (
          <Flex align="center" gap="2">
            <Box className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm">
              {friendName?.charAt(0) || "K"}
            </Box>
            <Text size="2" weight="medium" color="gray">
              {friendName || "김철수"}님의 할 일
            </Text>
          </Flex>
        )}
      </Flex>

      <Flex direction="column" gap="4" asChild>
        <ul>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <Box
                key={todo.id}
                className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <li>
                  <Flex gap="4" align="start">
                    {!isFriendTodo && (
                      <Flex
                        align="center"
                        justify="center"
                        className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
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
                        {todo.completed && <CheckIcon />}
                      </Flex>
                    )}

                    {isFriendTodo && (
                      <Flex
                        align="center"
                        justify="center"
                        className={`w-8 h-8 rounded-full transition-all duration-200 ${
                          todo.completed
                            ? "text-white bg-green-500"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {todo.completed ? <CheckIcon /> : <ClockIcon />}
                      </Flex>
                    )}

                    <Flex direction="column" gap="2" className="flex-grow">
                      <Flex justify="between" align="start">
                        <Text
                          size="3"
                          weight="medium"
                          className={`${
                            todo.completed
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {todo.title}
                        </Text>
                        <Flex gap="1">
                          {/* 내 투두인 경우 응원 수 표시 */}
                          {!isFriendTodo &&
                            todo.cheerCount &&
                            todo.cheerCount > 0 && (
                              <Flex align="center" className="bg-gray-100 px-2 py-1 rounded-full border border-gray-200 mr-1">
                                <Text className="text-sm mr-1">👏</Text>
                                <Text size="1" color="gray">
                                  {todo.cheerCount}
                                </Text>
                              </Flex>
                            )}
                          <IconButton
                            size="1"
                            variant="ghost"
                            color="gray"
                            onClick={(e) => handleDetailClick(todo, e)}
                            aria-label="상세 정보 보기"
                            className="hover:text-blue-500 transition-all duration-200"
                          >
                            <DetailIcon width={20} height={20} />
                          </IconButton>
                        </Flex>
                      </Flex>
                      <Flex align="center" gap="2" wrap="wrap">
                        {todo.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="surface"
                            radius="full"
                            color="gray"
                            className="hover:bg-gray-100 transition-colors duration-200"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </Flex>
                    </Flex>
                  </Flex>
                </li>
              </Box>
            ))
          ) : (
            <Card className="text-center py-16 bg-gray-50 border-dashed">
              <Box className="text-gray-600 mb-2">📅</Box>
              <Text weight="medium" color="gray" size="3" className="mb-1">
                이 날짜에 할 일이 없습니다
              </Text>
              <Text size="2" color="gray">
                {isFriendTodo
                  ? "다른 날짜를 선택해보세요"
                  : "새로운 할 일을 추가해보세요"}
              </Text>
            </Card>
          )}
        </ul>
      </Flex>

      {/* 디테일 팝오버 */}
      {selectedTodo && (
        <TodoDetail
          todo={selectedTodo}
          onClose={closeDetail}
          position={detailPosition}
          isFriendTodo={isFriendTodo}
        />
      )}

      {/* TodoAddModal */}
      <TodoAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
        selectedDate={selectedDate}
      />
    </Box>
  );
}
