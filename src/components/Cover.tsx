"use client";

import Image from "next/image";
import CoverExampleSrc from "@/assets/cover-example2.jpeg";
import { useState } from "react";

export default function Cover() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="mt-4 relative flex-shrink-0 w-full h-[200px] bg-gray-200 overflow-hidden rounded-xl"
    >
      <Image fill objectFit="cover" src={CoverExampleSrc} alt="Cover" />
      {isHover && (
        <button className="bg-gray-200 absolute top-2 right-2 px-2 py-1 rounded-md text-sm">
          배경사진 바꾸기
        </button>
      )}
    </div>
  );
}
