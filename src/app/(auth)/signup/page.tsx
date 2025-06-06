"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Input from "@/components/shared/ui/Input";
import Button from "@/components/shared/ui/Button";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function Page() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!id) newErrors.id = "아이디를 입력해주세요";
    if (!nickname) newErrors.nickname = "닉네임을 입력해주세요";
    if (!password) newErrors.password = "비밀번호를 입력해주세요";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 실제 회원가입 처리 로직
      console.log("회원가입 처리", { id, nickname, password });
    }
  };
  return (
    <Flex className="min-h-screen bg-white p-4" align="center" justify="center">
      <Container
        size="1"
        className="w-[400px] bg-white rounded-2xl overflow-hidden py-8 px-6"
      >
        <Flex direction="column" align="center" gap="2" mb="9">
          <Flex
            align="center"
            justify="center"
            className="bg-black rounded-full w-12 h-12"
          >
            <Image
              src={logo}
              alt="logo"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h1" size="5" mb="1">
              회원가입
            </Heading>
            <Text size="2" color="gray">
              새로운 계정을 만들어보세요
            </Text>
          </Flex>
        </Flex>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="id"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="사용할 아이디를 입력하세요"
            error={errors.id}
            required
          />

          <Input
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용할 닉네임을 입력하세요"
            error={errors.nickname}
            required
          />

          <Input
            id="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            type="password"
            error={errors.password}
            required
          />

          <Input
            id="password-confirm"
            label="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            type="password"
            error={errors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            className="mt-2"
          >
            회원가입
          </Button>
        </form>

        <Flex gap="2" align="center" justify="center" mt="6">
          <Text size="2" color="gray">
            이미 계정이 있으신가요?
          </Text>
          <Link
            className="text-sm font-medium text-black hover:text-gray-800 transition duration-200"
            href="/signin"
          >
            로그인
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
}
