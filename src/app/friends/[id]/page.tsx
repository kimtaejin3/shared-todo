"use client";

import { useParams } from "next/navigation";
import Header from "@/components/shared/Header";
import TodoContainer from "@/components/todo/TodoContainer";
import FriendNotFound from "@/components/friend/FriendNotFound";
import { useEffect, useState } from "react";

// 더미 친구 데이터
const FRIENDS = [
  { id: "1", name: "김철수" },
  { id: "2", name: "이영희" },
  { id: "3", name: "박지민" },
  { id: "4", name: "정민준" },
];

export default function FriendTodoPage() {
  const params = useParams();
  const [friendName, setFriendName] = useState<string | null>(null);

  useEffect(() => {
    const friendId = params.id as string;
    const friend = FRIENDS.find((f) => f.id === friendId);
    setFriendName(friend?.name || null);
  }, [params.id]);

  if (!friendName) {
    return <FriendNotFound />;
  }

  return (
    <div className="max-w-[670px] mx-auto pb-14 px-4">
      <Header />
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {friendName.charAt(0)}
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            {friendName}님의 할 일 목록
          </h1>
        </div>
        <p className="text-gray-500 text-sm">
          {friendName}님의 투두리스트입니다. 응원 버튼을 눌러 친구를
          응원해보세요!
        </p>
      </div>

      <TodoContainer isFriendTodo={true} friendName={friendName} />
    </div>
  );
}
