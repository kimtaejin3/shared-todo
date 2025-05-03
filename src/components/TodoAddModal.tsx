"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { useFadeIn, useModalEvents } from "@/hooks";

import "../app/date-picker-custom.css";

interface TodoAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: {
    title: string;
    tags: string[];
    color: string;
    date: Date;
  }) => void;
  selectedDate: Date;
}

const COLORS = [
  "#d0eeeb", // 민트
  "#E2E6FD", // 라벤더
  "#FFF0EA", // 살구색
  "#F0EDED", // 연회색
  "#FFEDD0", // 연주황
  "#E7F7E2", // 연두색
];

export default function TodoAddModal({
  isOpen,
  onClose,
  onAdd,
  selectedDate,
}: TodoAddModalProps) {
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [date, setDate] = useState<Date>(selectedDate);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fadeInClass = useFadeIn();

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 모달 이벤트(외부 클릭, ESC 키) 처리
  useModalEvents(modalRef, isOpen, onClose);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      onAdd({
        title: title.trim(),
        tags,
        color: selectedColor,
        date: date,
      });

      // 입력값 초기화
      setTitle("");
      setTags([]);
      setTagInput("");
      setSelectedColor(COLORS[0]);
      setDate(new Date());

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl p-6 w-full max-w-md shadow-xl ${fadeInClass}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">할 일 추가</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 입력 */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              ref={inputRef}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="할 일을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={50}
            />
          </div>

          {/* 날짜 선택 */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              날짜
            </label>
            <div className="relative w-full">
              <DatePicker
                id="date"
                selected={date}
                onChange={(date: Date | null) => date && setDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                locale={ko}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                showPopperArrow={false}
                wrapperClassName="w-full"
                calendarClassName="custom-datepicker"
                dayClassName={(dateValue) =>
                  dateValue &&
                  format(dateValue, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                    ? "selected-day"
                    : ""
                }
                popperClassName="custom-popper"
                popperPlacement="bottom-start"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 10L12 6H4L8 10Z" fill="#9CA3AF" />
                </svg>
              </div>
            </div>
          </div>

          {/* 색상 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              색상
            </label>
            <div className="flex space-x-3 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-black"
                      : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* 태그 입력 */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              태그 ({tags.length}/5)
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:border-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="태그를 입력하고 엔터 또는 추가 버튼을 누르세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={tags.length >= 5}
              />
              <button
                type="button"
                className="bg-gray-100 text-gray-700 px-4 rounded-r-lg hover:bg-gray-200 transition-colors"
                onClick={handleAddTag}
                disabled={tags.length >= 5 || !tagInput.trim()}
              >
                추가
              </button>
            </div>

            {/* 태그 목록 */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => removeTag(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              disabled={!title.trim()}
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
