"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "@/components/shared/DatePicker";
import Input from "@/components/shared/ui/Input";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import { useFadeIn } from "@/hooks/useAnimation";
import { useModalEvents } from "@/hooks/useModalEvents";
import Button from "@/components/shared/ui/buttons/Button";

import "@/styles/date-picker-custom.css";
import { Flex, IconButton, Box, Text, Heading } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";

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
  "#0ea5a0",
  "#6c7ae0",
  "#e07a5f",
  "#6b7280",
  "#e0923e",
  "#65a30d",
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

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Flex
          align="center"
          justify="center"
          className="fixed inset-0 z-50 px-4"
        >
          <Dialog.Content asChild>
            <Box
              ref={modalRef}
              className={`w-full max-w-md p-6 shadow-xl bg-white rounded-2xl ${fadeInClass}`}
            >
              <Flex justify="between" align="center" className="mb-6">
                <Heading size="4" className="text-gray-800 font-bold">
                  할 일 추가
                </Heading>
                <Dialog.Close asChild>
                  <IconButton
                    variant="ghost"
                    className="rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="닫기"
                  >
                    <CloseIcon />
                  </IconButton>
                </Dialog.Close>
              </Flex>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <Box>
                  <Text
                    as="label"
                    htmlFor="date"
                    size="2"
                    weight="medium"
                    className="block mb-2 text-gray-700"
                  >
                    날짜
                  </Text>
                  <DatePicker
                    selectedDate={date}
                    setSelectedDate={setDate}
                    className="!w-full"
                  />
                </Box>

                <Box>
                  <Text
                    as="label"
                    size="2"
                    weight="medium"
                    className="block mb-2 text-gray-700"
                  >
                    색상
                  </Text>
                  <Flex gap="10px">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full transition-all ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-black shadow-md"
                            : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-600 border"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`색상 선택: ${color}`}
                        aria-pressed={selectedColor === color}
                      />
                    ))}
                  </Flex>
                </Box>

                <Box>
                  <Text
                    as="label"
                    htmlFor="tags"
                    size="2"
                    weight="medium"
                    className="block mb-2 text-gray-700"
                  >
                    태그 ({tags.length}/5)
                  </Text>
                  <Input
                    id="tags"
                    label=""
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="태그를 입력하고 엔터 또는 추가 버튼을 누르세요"
                    onKeyDown={handleTagKeyDown}
                    disabled={tags.length >= 5}
                  />

                  {tags.length > 0 && (
                    <Flex gap="2" mt="3">
                      {tags.map((tag, index) => (
                        <Flex
                          key={index}
                          className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                          <IconButton
                            ml="1"
                            variant="ghost"
                            type="button"
                            className="ml-1 text-gray-500"
                            onClick={() => removeTag(index)}
                          >
                            x
                          </IconButton>
                        </Flex>
                      ))}
                    </Flex>
                  )}
                </Box>

                <Flex justify="end" gap="10px" className="pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!title.trim()}
                  >
                    추가
                  </Button>
                </Flex>
              </form>
            </Box>
          </Dialog.Content>
        </Flex>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
