import React from 'react';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import Header from '@/components/shared/Header';

const FriendNotFound: React.FC = () => {
  return (
    <Box className="max-w-[670px] mx-auto px-4">
      <Header />
      <Flex className="items-center justify-center h-[50vh]">
        <Box className="text-center">
          <Text className="text-gray-400 text-4xl mb-4">😕</Text>
          <Heading as="h2" className="text-xl font-semibold text-gray-700 mb-2">
            친구를 찾을 수 없습니다
          </Heading>
          <Text className="text-gray-500">
            요청하신 친구의 정보를 찾을 수 없습니다
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default FriendNotFound;
