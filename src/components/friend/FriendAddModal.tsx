"use client";

import { useState, useRef, useEffect } from "react";
import Input from "@/components/common/inputs/Input";
import { useFadeIn } from "@/hooks/useAnimation";
import { useModalEvents } from "@/hooks/useModalEvents";
import CloseIcon from "@/components/common/icons/CloseIcon";
import Button from "../common/buttons/Button";

interface FriendAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (friendId: string) => void;
}

export default function FriendAddModal({
  isOpen,
  onClose,
  onAdd,
}: FriendAddModalProps) {
  const [friendId, setFriendId] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fadeInClass = useFadeIn();

  // 모달이 열릴 때 입력란에 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 모달 이벤트(외부 클릭, ESC 키) 처리
  useModalEvents(modalRef, isOpen, onClose);

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (friendId.trim()) {
      onAdd(friendId.trim());

      // 입력값 초기화
      setFriendId("");

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
          <h2 className="text-xl font-bold text-gray-800">친구 추가하기</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="friendId"
            label="친구 ID"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            placeholder="추가할 친구의 ID를 입력하세요"
            required
            inputRef={inputRef}
            helpText="친구의 ID를 입력하면 친구 요청이 전송됩니다. 상대방이 수락하면 친구가 됩니다."
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              size="lg"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={!friendId.trim()}
            >
              요청 보내기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
