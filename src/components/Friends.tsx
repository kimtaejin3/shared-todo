"use client";

import Image from "next/image";
import PreviousSvgSrc from "@/assets/icons/previous.svg";
import NextSvgSrc from "@/assets/icons/next.svg";
import MockImageSrc from "@/assets/mock_image.jpeg";
import { useRef } from "react";

export default function Friends() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 60,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center py-4 w-full">
      <span className="bg-gray-100 text-gray-600 rounded-xl text-sm px-4 py-2">
        내 친구들의 투두리스트 확인하러가기
      </span>
      <div className="flex items-center gap-6 max-w-[460px] w-full">
        <button
          onClick={scrollLeft}
          className="flex-shrink-0 bg-gray-200 opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:opacity-100 transition-opacity"
        >
          <Image src={PreviousSvgSrc} alt="Previous" width={6} height={6} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-hide"
        >
          <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 overflow-hidden p-1">
            <Image fill objectFit="cover" src={MockImageSrc} alt="Mock" />
          </div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
        </div>
        <button
          onClick={scrollRight}
          className="flex-shrink-0 bg-gray-200 opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:opacity-100 transition-opacity"
        >
          <Image src={NextSvgSrc} alt="Next" width={6} height={6} />
        </button>
      </div>
    </div>
  );
}
