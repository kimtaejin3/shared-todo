"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "@/components/common/ui/DatePicker";
import Input from "@/components/common/inputs/Input";
import CloseIcon from "@/components/common/icons/CloseIcon";
import { useFadeIn } from "@/hooks/useAnimation";
import { useModalEvents } from "@/hooks/useModalEvents";
import Button from "@/components/common/buttons/Button";

import "@/styles/date-picker-custom.css";

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
  "#0ea5a0", // 더 진한 민트
  "#6c7ae0", // 더 진한 라벤더
  "#e07a5f", // 더 진한 살구색
  "#6b7280", // 더 진한 회색
  "#e0923e", // 더 진한 주황
  "#65a30d", // 더 진한 두색
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
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
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 입력 */}
          <Input
            id="title"
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
            required
            maxLength={50}
            inputRef={inputRef}
          />

          {/* 날짜 선택 */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              날짜
            </label>
            <DatePicker
              selectedDate={date}
              setSelectedDate={setDate}
              className="!w-full"
            />
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
                      ? "ring-2 ring-offset-2 ring-black shadow-md"
                      : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-600 border"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`색상 선택: ${color}`}
                  aria-pressed={selectedColor === color}
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
            <Input
              id="tags"
              label=""
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 입력하고 엔터 또는 추가 버튼을 누르세요"
              onKeyDown={handleTagKeyDown}
              disabled={tags.length >= 5}
            />

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
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!title.trim()}
            >
              추가
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
