import Image from "next/image";
import { Box, Flex, Text } from "@radix-ui/themes";
import { StaticImageData } from "next/image";

interface FriendAvatarProps {
  name: string;
  image: StaticImageData | string | null;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function FriendAvatar({
  name,
  image,
  showName = true,
  size = "md",
}: FriendAvatarProps) {
  // 크기에 따른 width와 height 설정
  const dimensions = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  return (
    <Box
      className={`relative flex-none ${dimensions[size]} rounded-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
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
        <Flex
          align="center"
          justify="center"
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"
        >
          <Text size="2" weight="medium" color="gray">
            {name.charAt(0)}
          </Text>
        </Flex>
      )}

      {showName && (
        <Box className="absolute inset-x-0 -bottom-6 bg-black bg-opacity-70 py-1 text-center opacity-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-6">
          <Text size="1">{name}</Text>
        </Box>
      )}
    </Box>
  );
}
