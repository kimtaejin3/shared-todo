import React from "react";
import { Box, Flex, Text, Heading } from "@radix-ui/themes";
import Header from "@/components/shared/Header";

const FriendNotFound: React.FC = () => {
  return (
    <Box className="max-w-[670px] mx-auto px-4">
      <Header />
      <Flex align="center" justify="center" className="h-[50vh]">
        <Box className="text-center">
          <Text size="4" color="gray">
            😕
          </Text>
          <Heading as="h2" size="5" color="gray">
            친구를 찾을 수 없습니다
          </Heading>
          <Text size="2" color="gray">
            요청하신 친구의 정보를 찾을 수 없습니다
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default FriendNotFound;
