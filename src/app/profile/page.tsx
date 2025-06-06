"use client";

import { useState, useRef, ChangeEvent } from "react";
import Header from "@/components/shared/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/shared/ui/Input";
import EmailIcon from "@/components/shared/icons/EmailIcon";
import IdIcon from "@/components/shared/icons/IdIcon";
import ProfileIcon from "@/components/shared/icons/ProfileIcon";
import Button from "@/components/shared/ui/Button";
import { Box, Flex, Text, Heading, Card } from "@radix-ui/themes";

export default function ProfilePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("나내일");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState("naewis1516@dilution.org");
  const [userId, setUserId] = useState("AJELDN920E");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameError(value.trim() === "");
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (nickname.trim() === "") {
      setIsNicknameError(true);
      return;
    }

    router.push("/");
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      router.push("/");
    }
  };

  return (
    <Box className="max-w-[670px] mx-auto px-4">
      <Header />

      <Flex
        direction="column"
        align="center"
        className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <Box className="relative mb-6">
          <Flex
            align="center"
            justify="center"
            onClick={handleProfileImageClick}
            className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden cursor-pointer group"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Flex
                align="center"
                justify="center"
                className="absolute inset-0 text-gray-400"
              >
                <ProfileIcon className="h-12 w-12" />
              </Flex>
            )}
            <Flex
              align="center"
              justify="center"
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Text className="text-white text-xs font-medium">사진 변경</Text>
            </Flex>
          </Flex>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfileImageChange}
            className="hidden"
            accept="image/*"
          />
        </Box>

        <form onSubmit={handleSave} className="w-full max-w-sm space-y-4">
          <Input
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임 입력"
            error={isNicknameError ? "올바른 닉네임이 아닙니다." : ""}
          />

          <Input id="email" label="이메일" value={email} disabled />

          <Input id="userId" label="내 ID" value={userId} disabled />

          <Flex className="pt-4 flex-col gap-3">
            <Button type="submit" variant="primary" fullWidth size="lg">
              저장하기
            </Button>

            <Button
              type="button"
              variant="outline"
              fullWidth
              size="lg"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}
