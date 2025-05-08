"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Input from "@/components/shared/ui/Input";
import InputUserIcon from "@/components/shared/icons/InputUserIcon";
import LockIcon from "@/components/shared/icons/LockIcon";
import ShieldIcon from "@/components/shared/icons/ShieldIcon";
import GroupIcon from "@/components/shared/icons/GroupIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Button from "@/components/shared/ui/buttons/Button";

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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-[400px] bg-white rounded-2xl overflow-hidden py-8 px-6">
        <h1 className="flex flex-col justify-center mb-10 items-center gap-2">
          <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
            <Image
              src={logo}
              alt="logo"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold block">회원가입</span>
            <span className="text-gray-500 mt-1">
              새로운 계정을 만들어보세요
            </span>
          </div>
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="id"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="사용할 아이디를 입력하세요"
            leftIcon={<UserIcon />}
            error={errors.id}
            required
          />

          <Input
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용할 닉네임을 입력하세요"
            leftIcon={<GroupIcon />}
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
            leftIcon={<LockIcon />}
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
            leftIcon={<ShieldIcon />}
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

        <div className="flex gap-2 items-center justify-center mt-6">
          <p className="text-sm text-gray-600">이미 계정이 있으신가요?</p>
          <Link
            className="text-sm font-medium text-black hover:text-gray-800 transition duration-200"
            href="/signin"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
