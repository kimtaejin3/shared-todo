import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[400px] ">
        <h1 className="flex flex-col justify-center mb-10 items-center gap-2">
          <Image src={logo} alt="logo" width={30} height={80} />
          <span className="text-2xl font-bold">회원가입</span>
        </h1>
        <form className="flex flex-col gap-10">
          <div>
            <label htmlFor="id">아이디</label>
            <input
              className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
              type="text"
              id="id"
            />
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
              type="text"
              id="nickname"
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
              type="password"
              id="password"
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호 확인</label>
            <input
              className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
              type="password"
              id="password"
            />
          </div>
          <button
            className="block w-full bg-[#4b4344] text-white rounded-md p-2"
            type="submit"
          >
            회원가입
          </button>
        </form>
      </div>
      <div className="flex gap-2 items-center justify-center mt-4">
        <p>이미 계정이 있으신가요?</p>
        <Link className="border-b border-gray-300" href="/signin">
          로그인
        </Link>
      </div>
    </div>
  );
}
