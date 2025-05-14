"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import DatePicker from "../shared/DatePicker";
import AddButton from "@/components/shared/ui/buttons/AddButton";
import TodoItem from "./TodoItem";
import { Todo } from "./TodoContainer";

interface TodoListProps {
  todos: Todo[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onToggleComplete: (id: number) => void;
  onAddTodo: () => void;
  isFriendTodo?: boolean;
  friendName?: string;
  todoCount: number;
}

export default function TodoList({
  todos,
  selectedDate,
  setSelectedDate,
  onToggleComplete,
  onAddTodo,
  isFriendTodo = false,
  friendName,
  todoCount,
}: TodoListProps) {
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
            {todoCount > 0
              ? `${todoCount}개의 할 일이 있습니다`
              : "할 일이 없습니다"}
          </Text>
        </Flex>

        {!isFriendTodo && (
          <AddButton
            onClick={onAddTodo}
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
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isFriendTodo={isFriendTodo}
                onToggleComplete={onToggleComplete}
              />
            ))
          ) : (
            <Flex direction="column" align="center" className="text-center py-16 bg-gray-50 border border-gray-200 rounded-xl w-full">
              <Text weight="medium" color="gray" size="3" className="mb-1">
              🗓️
                이 날짜에 할 일이 없습니다
              </Text>
              <Text size="2" color="gray">
                {isFriendTodo
                  ? "다른 날짜를 선택해보세요"
                  : "새로운 할 일을 추가해보세요"}
              </Text>
            </Flex>
          )}
        </ul>
      </Flex>
    </Box>
  );
}
