import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

export default function Page() {
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
            <span className="text-2xl font-bold block">환영합니다</span>
            <span className="text-gray-500 mt-1">계정에 로그인하세요</span>
          </div>
        </h1>

        <form className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              아이디
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
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
              <input
                className="block w-full pl-10 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                type="text"
                id="id"
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="block w-full pl-10 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          <button
            className="block w-full bg-black text-white rounded-lg p-2.5 font-medium hover:bg-gray-800 transition duration-200 mt-2"
            type="submit"
          >
            로그인
          </button>
        </form>

        <div className="flex gap-2 items-center justify-center mt-6">
          <p className="text-sm text-gray-600">계정이 없으신가요?</p>
          <Link
            className="text-sm font-medium text-black hover:text-gray-800 transition duration-200"
            href="/signup"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
