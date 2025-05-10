import { useRef } from "react";
import Link from "next/link";
import { Flex, IconButton } from "@radix-ui/themes";
import PreviousIcon from "@/components/shared/icons/PreviousIcon";
import NextIcon from "@/components/shared/icons/NextIcon";
import FriendAvatar from "./FriendAvatar";
import { Friend } from "@/types/friend";



interface FriendListProps {
  friends: Friend[];
}

export default function FriendList({
  friends,
}: FriendListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <Flex align="center" gap="5" width="100%">
      <IconButton
        size="2"
        variant="soft"
        color="gray"
        onClick={scrollLeft}
        radius="full"
        aria-label="이전으로 스크롤"
      >
        <PreviousIcon width={16} height={16} />
      </IconButton>

      <Flex
        ref={scrollContainerRef}
        align="center"
        gap="4"
        className="overflow-x-auto w-full py-2 px-1 scrollbar-hide"
      >
        {friends.map((friend) => (
          <Link href={`/friends/${friend.id}`} key={friend.id}>
            <FriendAvatar
              name={friend.name}
              image={friend.image}
            />
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
      >
        <NextIcon width={16} height={16} />
      </IconButton>
    </Flex>
  );
}
