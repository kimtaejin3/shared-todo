"use client";

import { useState, useRef, ChangeEvent } from "react";
import Header from "@/components/common/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("나내일");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("naewis1516@dilution.org");
  const [userId, setUserId] = useState("AJELDN920E");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 닉네임 변경 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameError(value.trim() === "");
  };

  // 비밀번호 변경 처리
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setIsPasswordError(e.target.value !== confirmPassword);
    }
  };

  // 비밀번호 확인 처리
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setIsPasswordError(password !== e.target.value);
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

    if (password && password !== confirmPassword) {
      setIsPasswordError(true);
      return;
    }

    // 실제 구현에서는 여기서 API 호출을 통해 프로필 정보를 저장합니다.
    alert("프로필이 저장되었습니다.");
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
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <form onSubmit={handleSave} className="w-full max-w-sm space-y-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              닉네임
            </label>
            <div className="flex items-stretch">
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                className={`flex-1 border ${
                  isNicknameError ? "border-red-300" : "border-gray-300"
                } rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200`}
                placeholder="닉네임 입력"
              />
              <button
                type="button"
                className="bg-gray-800 text-white px-3 py-2 rounded-r-lg text-sm hover:bg-gray-700 transition-colors"
              >
                수정
              </button>
            </div>
            {isNicknameError && (
              <p className="text-red-500 text-xs mt-1">
                올바른 닉네임이 아닙니다.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <div className="flex items-stretch">
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`flex-1 border ${
                  isPasswordError ? "border-red-300" : "border-gray-300"
                } rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200`}
                placeholder="●●●●●●●●●●●●"
              />
              <button
                type="button"
                className="bg-gray-800 text-white px-3 py-2 rounded-r-lg text-sm hover:bg-gray-700 transition-colors"
              >
                수정
              </button>
            </div>
          </div>

          {password && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full border ${
                  isPasswordError ? "border-red-300" : "border-gray-300"
                } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200`}
                placeholder="비밀번호 확인"
              />
              {isPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              내 ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 text-sm"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              저장하기
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-white text-gray-700 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
