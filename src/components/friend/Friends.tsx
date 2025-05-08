"use client";

import Image from "next/image";
import Link from "next/link";
import PreviousIcon from "@/components/shared/icons/PreviousIcon";
import NextIcon from "@/components/shared/icons/NextIcon";
import MockImageSrc from "@/assets/images/mock_image.jpeg";
import { useRef, useState } from "react";
import FriendAddModal from "./FriendAddModal";
import AddButton from "@/components/shared/ui/buttons/AddButton";

// 더미 친구 데이터
const FRIENDS = [
  { id: "1", name: "김철수", image: MockImageSrc },
  { id: "2", name: "이영희", image: null },
  { id: "3", name: "박지민", image: null },
  { id: "4", name: "정민준", image: null },
  { id: "5", name: "최영희", image: null },
  { id: "6", name: "강승호", image: null },
  { id: "7", name: "윤서아", image: null },
  { id: "8", name: "임지훈", image: null },
  { id: "9", name: "한수민", image: null },
];

export default function Friends() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [friends, setFriends] = useState(FRIENDS);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 60,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 60,
        behavior: "smooth",
      });
    }
  };

  // 친구 추가 핸들러
  const handleAddFriend = (friendId: string) => {
    // 실제 구현에서는 API 호출을 통해 친구 요청을 전송합니다.
    console.log(`친구 추가 요청: ${friendId}`);

    // 현재는 데모를 위한 더미 데이터 추가
    const newFriend = {
      id: `new-${Date.now()}`,
      name: friendId,
      image: null,
    };

    setFriends([...friends, newFriend]);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-lg font-semibold text-gray-700">내 친구들</h3>
        <div className="flex gap-2">
          <AddButton
            onClick={() => setIsAddModalOpen(true)}
            label="친구 추가"
          />
        </div>
      </div>
      <div className="relative w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-5 w-full">
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 z-10 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-gray-500"
          >
            <PreviousIcon width={16} height={16} className="text-gray-600" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 w-full pl-1 pr-2"
          >
            {friends.map((friend, index) => (
              <Link href={`/friends/${friend.id}`} key={friend.id}>
                <div
                  className={`relative flex-shrink-0 w-14 h-14 rounded-full ${
                    index === 0 ? "ring-2 ring-blue-400 ring-offset-2" : ""
                  } overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
                >
                  {friend.image ? (
                    <Image
                      fill
                      objectFit="cover"
                      src={friend.image}
                      alt={`Friend ${friend.name}`}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium text-sm">
                        {friend.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-0 -bottom-6 bg-black bg-opacity-70 text-white text-xs py-1 text-center opacity-0 hover:opacity-100 hover:-translate-y-6 transition-all duration-200">
                    {friend.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="flex-shrink-0 z-10 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-gray-500"
          >
            <NextIcon width={16} height={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 친구 추가 모달 */}
      <FriendAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddFriend}
      />
    </div>
  );
}
