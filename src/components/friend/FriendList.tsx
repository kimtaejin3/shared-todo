import { useRef } from "react";
import Link from "next/link";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import PreviousIcon from "@/components/shared/icons/PreviousIcon";
import NextIcon from "@/components/shared/icons/NextIcon";
import FriendAvatar from "./FriendAvatar";
import { Friend } from "@/types/friend";

interface FriendListProps {
  friends: Friend[];
}

export default function FriendList({ friends }: FriendListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex justify="center" className="py-3 border border-gray-100 rounded-xl">
      <Flex align="center" gap="5" className="max-w-[560px] w-full">
        <IconButton
          size="2"
          variant="soft"
          color="gray"
          onClick={scrollLeft}
          radius="full"
          aria-label="이전으로 스크롤"
          className="z-10 shadow-sm bg-white/90"
        >
          <PreviousIcon width={16} height={16} />
        </IconButton>

        <Flex
          ref={scrollContainerRef}
          align="center"
          gap="3"
          className="overflow-x-auto py-2 scrollbar-hide mx-auto w-[calc(100%-80px)]"
        >
          {friends.map((friend) => (
            <Link
              href={`/friends/${friend.id}`}
              key={friend.id}
              className="flex-shrink-0"
            >
              <FriendAvatar name={friend.name} image={friend.image} />
            </Link>
          ))}
        </Flex>

        <IconButton
          size="2"
          variant="soft"
          color="gray"
          onClick={scrollRight}
          radius="full"
          aria-label="다음으로 스크롤"
          className="z-10 shadow-sm bg-white/90"
        >
          <NextIcon width={16} height={16} />
        </IconButton>
      </Flex>
    </Flex>
  );
}
