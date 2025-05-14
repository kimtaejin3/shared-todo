"use client";

import { useState, useRef, useEffect } from "react";
import Input from "@/components/shared/ui/Input";
import { useFadeIn } from "@/hooks/useAnimation";
import { useModalEvents } from "@/hooks/useModalEvents";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import Button from "../shared/ui/buttons/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";

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
                  친구 추가하기
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
                  id="friendId"
                  label="친구 ID"
                  value={friendId}
                  onChange={(e) => setFriendId(e.target.value)}
                  placeholder="추가할 친구의 ID를 입력하세요"
                  required
                  inputRef={inputRef}
                  helpText="친구의 ID를 입력하면 친구 요청이 전송됩니다. 상대방이 수락하면 친구가 됩니다."
                />

                <Flex justify="end" gap="10px">
                  <Button type="button" variant="outline" onClick={onClose}>
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!friendId.trim()}
                  >
                    요청 보내기
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
