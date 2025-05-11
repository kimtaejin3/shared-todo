import Image from "next/image";
import { Box, Flex, Text } from "@radix-ui/themes";
import { StaticImageData } from "next/image";
import defaultUserImage from "@/assets/images/user.png";

interface FriendAvatarProps {
  name: string;
  image: StaticImageData | string | null;
  size?: "sm" | "md" | "lg";
}

export default function FriendAvatar({
  name,
  image,
  size = "md",
}: FriendAvatarProps) {
  // 크기에 따른 width와 height 설정
  const dimensions = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  return (
    <Flex direction="column" align="center" gap="1" className="w-16">
      <Box
        className={`relative flex-none ${dimensions[size]} rounded-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-gray-200`}
      >
        {image ? (
          <Image
            fill
            objectFit="cover"
            src={image}
            alt={`Friend ${name}`}
            className="transition-transform duration-200 hover:scale-105"
          />
        ) : (
          <Image
            fill
            objectFit="cover"
            src={defaultUserImage}
            alt={`Friend ${name}`}
            className="transition-transform duration-200 hover:scale-105"
          />
        )}
      </Box>
      <Text size="1" align="center" className="truncate w-full" title={name}>
        {name}
      </Text>
    </Flex>
  );
}
