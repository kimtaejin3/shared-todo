"use client";

import { useState, useRef, ChangeEvent } from "react";
import Header from "@/components/common/ui/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconInput from "@/components/common/inputs/IconInput";
import ButtonInput from "@/components/common/inputs/ButtonInput";
import InputUserIcon from "@/components/common/icons/InputUserIcon";
import EmailIcon from "@/components/common/icons/EmailIcon";
import IdIcon from "@/components/common/icons/IdIcon";
import Button from "@/components/common/buttons/Button";

export default function ProfilePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("나내일");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState("naewis1516@dilution.org");
  const [userId, setUserId] = useState("AJELDN920E");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 닉네임 변경 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameError(value.trim() === "");
  };

  // 프로필 이미지 변경 처리
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

  // 프로필 이미지 선택 버튼 클릭
  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  // 프로필 저장 처리
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (nickname.trim() === "") {
      setIsNicknameError(true);
      return;
    }

    router.push("/");
  };

  // 로그아웃 처리
  const handleLogout = () => {
    // 실제 구현에서는 여기서 로그아웃 API를 호출하고 세션/토큰을 삭제합니다.
    if (confirm("로그아웃 하시겠습니까?")) {
      router.push("/");
    }
  };

  return (
    <div className="max-w-[670px] mx-auto px-4">
      <Header />

      <div className="mt-6 flex flex-col items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative mb-2">
          <div
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
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <div className="text-white text-xs font-medium">사진 변경</div>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfileImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="text-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">{nickname}</h2>
        </div>

        <form onSubmit={handleSave} className="w-full max-w-sm space-y-4">
          <ButtonInput
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임 입력"
            error={isNicknameError ? "올바른 닉네임이 아닙니다." : ""}
            buttonText="수정"
            onButtonClick={() => console.log("닉네임 수정 버튼 클릭")}
          />

          <IconInput
            id="email"
            label="이메일"
            value={email}
            disabled
            icon={<EmailIcon />}
          />

          <IconInput
            id="userId"
            label="내 ID"
            value={userId}
            disabled
            icon={<IdIcon />}
          />

          <div className="pt-4 flex flex-col gap-3">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
            >
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
          </div>
        </form>
      </div>
    </div>
  );
}
