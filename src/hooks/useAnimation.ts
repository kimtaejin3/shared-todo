import { useEffect } from "react";

interface AnimationConfig {
  name: string;
  keyframes: string;
  duration?: string;
  timingFunction?: string;
  fillMode?: string;
}

/**
 * CSS 애니메이션을 동적으로 추가하는 훅
 *
 * @param config 애니메이션 설정 객체
 * @returns 애니메이션 클래스명
 */
export const useAnimation = (config: AnimationConfig): string => {
  const {
    name,
    keyframes,
    duration = "0.2s",
    timingFunction = "ease-out",
    fillMode = "forwards",
  } = config;

  const animationClassName = `animate-${name}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 기존에 같은 이름의 스타일 요소가 있는지 확인
      const existingStyle = document.getElementById(`animation-style-${name}`);

      if (!existingStyle) {
        const style = document.createElement("style");
        style.id = `animation-style-${name}`;
        style.textContent = `
          @keyframes ${name} {
            ${keyframes}
          }
          .${animationClassName} {
            animation: ${name} ${duration} ${timingFunction} ${fillMode};
          }
        `;
        document.head.appendChild(style);

        return () => {
          // 컴포넌트 언마운트 시 스타일 요소 제거
          const styleElement = document.getElementById(
            `animation-style-${name}`
          );
          if (styleElement) {
            document.head.removeChild(styleElement);
          }
        };
      }
    }
  }, [name, keyframes, duration, timingFunction, fillMode, animationClassName]);

  return animationClassName;
};

/**
 * 페이드인 애니메이션 효과를 적용하는 훅
 */
export const useFadeIn = () => {
  return useAnimation({
    name: "fadeIn",
    keyframes: `
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    `,
    duration: "0.2s",
  });
};

/**
 * 토스트 메시지용 페이드인 애니메이션 효과를 적용하는 훅
 */
export const useToastFadeIn = () => {
  return useAnimation({
    name: "toastFadeIn",
    keyframes: `
      from { opacity: 0; transform: translate(-50%, -20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    `,
  });
};
