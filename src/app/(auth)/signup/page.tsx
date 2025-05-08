"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import IconInput from "@/components/common/inputs/IconInput";
import { UserIcon, LockIcon, ShieldIcon, GroupIcon } from "@/components/common/icons/InputIcons";

export default function Page() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};
    
    if (!id) newErrors.id = "아이디를 입력해주세요";
    if (!nickname) newErrors.nickname = "닉네임을 입력해주세요";
    if (!password) newErrors.password = "비밀번호를 입력해주세요";
    if (password !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    
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
          <IconInput
            id="id"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="사용할 아이디를 입력하세요"
            icon={<UserIcon />}
            error={errors.id}
            required
          />

          <IconInput
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용할 닉네임을 입력하세요"
            icon={<GroupIcon />}
            error={errors.nickname}
            required
          />

          <IconInput
            id="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            type="password"
            icon={<LockIcon />}
            error={errors.password}
            required
          />

          <IconInput
            id="password-confirm"
            label="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            type="password"
            icon={<ShieldIcon />}
            error={errors.confirmPassword}
            required
          />

          <button
            className="block w-full bg-black text-white rounded-lg p-2.5 font-medium hover:bg-gray-800 transition duration-200 mt-2"
            type="submit"
          >
            회원가입
          </button>
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
