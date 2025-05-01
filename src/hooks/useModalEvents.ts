import { useEffect, RefObject } from "react";

/**
 * 모달 외부 클릭 감지를 위한 훅
 * @param ref 모달 요소의 ref
 * @param isOpen 모달 열림 상태
 * @param onClose 모달을 닫는 함수
 */
export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen && typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [ref, isOpen, onClose]);
};

/**
 * ESC 키 감지를 위한 훅
 * @param isOpen 모달 열림 상태
 * @param onClose 모달을 닫는 함수
 */
export const useEscapeKey = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen && typeof window !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, onClose]);
};

/**
 * 모달 이벤트(외부 클릭, ESC 키)를 한번에 처리하는 훅
 * @param ref 모달 요소의 ref
 * @param isOpen 모달 열림 상태
 * @param onClose 모달을 닫는 함수
 */
export const useModalEvents = (
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void
) => {
  useOutsideClick(ref, isOpen, onClose);
  useEscapeKey(isOpen, onClose);
};
