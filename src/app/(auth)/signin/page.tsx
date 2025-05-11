"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Input from "@/components/shared/ui/Input";
import InputUserIcon from "@/components/shared/icons/InputUserIcon";
import LockIcon from "@/components/shared/icons/LockIcon";
import Button from "@/components/shared/ui/buttons/Button";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function Page() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!id) newErrors.id = "아이디를 입력해주세요";
    if (!password) newErrors.password = "비밀번호를 입력해주세요";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 실제 로그인 처리 로직
      console.log("로그인 처리", { id, password });
    }
  };
  return (
    <Flex className="min-h-screen bg-white p-4" align="center" justify="center">
      <Container size="1" className="w-[400px] bg-white rounded-2xl overflow-hidden py-8 px-6">
        <Flex direction="column" align="center" gap="2" mb="9">
          <Flex align="center" justify="center" className="bg-black rounded-full w-12 h-12">
            <Image
              src={logo}
              alt="logo"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h1" size="5" mb="1">환영합니다</Heading>
            <Text size="2" color="gray">계정에 로그인하세요</Text>
          </Flex>
        </Flex>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="id"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
            leftIcon={<InputUserIcon />}
            error={errors.id}
            required
          />

          <Input
            id="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            type="password"
            leftIcon={<LockIcon />}
            error={errors.password}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            className="mt-2"
          >
            로그인
          </Button>
        </form>

        <Flex gap="2" align="center" justify="center" mt="6">
          <Text size="2" color="gray">계정이 없으신가요?</Text>
          <Link
            className="text-sm font-medium text-black hover:text-gray-800 transition duration-200"
            href="/signup"
          >
            회원가입
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
}
