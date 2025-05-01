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
    <div className="flex flex-col gap-6 w-full mt-6">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-lg font-semibold text-gray-700">내 친구들</h3>
        <span className="bg-white text-gray-600 rounded-xl text-sm px-4 py-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
          투두리스트 확인하러가기
        </span>
      </div>
      <div className="relative w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-5 w-full">
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 z-10 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-gray-500"
          >
            <Image src={PreviousSvgSrc} alt="Previous" width={6} height={6} />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 w-full pl-1 pr-2"
          >
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`relative flex-shrink-0 w-14 h-14 rounded-full ${
                  index === 0 ? "ring-2 ring-blue-300 ring-offset-2" : ""
                } overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
              >
                {index === 0 ? (
                  <Image
                    fill
                    objectFit="cover"
                    src={MockImageSrc}
                    alt={`Friend ${index + 1}`}
                    className="hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="flex-shrink-0 z-10 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-gray-500"
          >
            <Image src={NextSvgSrc} alt="Next" width={6} height={6} />
          </button>
        </div>
      </div>
    </div>
  );
}
