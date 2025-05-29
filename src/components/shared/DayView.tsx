"use client";

import Image from "next/image";
import CoverExampleSrc from "@/assets/images/cover-example2.jpeg";
import { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@radix-ui/themes";

// 날씨 아이콘을 위한 임포트
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  cityName: string;
}

export default function Cover() {
  const [isHover, setIsHover] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 날씨 아이콘을 선택하는 함수
  const getWeatherIcon = (iconCode: string) => {
    const code = iconCode.substring(0, 2);

    // 아이콘 코드에 따라 다른 아이콘 반환
    switch (code) {
      case "01":
        return <WiDaySunny className="text-4xl" />;
      case "02":
      case "03":
      case "04":
        return <WiCloudy className="text-4xl" />;
      case "09":
      case "10":
        return <WiRain className="text-4xl" />;
      case "11":
        return <WiThunderstorm className="text-4xl" />;
      case "13":
        return <WiSnow className="text-4xl" />;
      case "50":
        return <WiFog className="text-4xl" />;
      default:
        return <WiDaySunny className="text-4xl" />;
    }
  };

  useEffect(() => {
    // 시간에 따른 인사말 설정
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("좋은 아침이에요");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("활기찬 오후에요");
      } else {
        setGreeting("편안한 저녁이에요");
      }
    };

    // 현재 시간 포맷팅
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    // 현재 날짜 포맷팅
    const updateDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const dayName = days[now.getDay()];
      setCurrentDate(`${year}년 ${month}월 ${date}일 ${dayName}요일`);
    };

    // 날씨 정보 가져오기
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        // 기본 위치 (서울)
        const lat = 37.5665;
        const lon = 126.978;

        // API KEY가 필요하지만, 여기서는 더미 데이터로 구현
        // 실제 구현 시 API KEY 필요: const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        // 더미 데이터 사용
        const dummyData = {
          main: {
            temp: 18.5, // 섭씨
          },
          weather: [
            {
              main: "Clouds",
              icon: "03d",
            },
          ],
          name: "서울",
        };

        // const data = await res.json();
        const data = dummyData;

        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
          cityName: data.name,
        });
      } catch (error) {
        console.error("날씨 정보를 가져오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // 초기 설정
    updateGreeting();
    updateTime();
    updateDate();
    fetchWeather();

    // 1분마다 시간 업데이트
    const interval = setInterval(() => {
      updateTime();
      updateDate();
      updateGreeting();
    }, 60000);

    // 30분마다 날씨 업데이트
    const weatherInterval = setInterval(() => {
      fetchWeather();
    }, 1800000);

    return () => {
      clearInterval(interval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <Box
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative flex-shrink-0 w-full h-[200px] bg-gray-200 overflow-hidden rounded-xl"
    >
      {/* 커버 이미지 */}
      <Image
        fill
        objectFit="cover"
        src={CoverExampleSrc}
        alt="Cover"
        className="brightness-[0.85]"
      />

      {/* 시간/날짜 오버레이 */}
      <Flex
        direction="column"
        justify="center"
        className="absolute inset-0 px-8 text-white"
      >
        <Flex
          justify="between"
          align="end"
          className="w-full max-[490px]:flex-col max-[490px]:items-start gap-4"
        >
          <Box>
            <Flex align="end" gap="3" className="mb-1">
              <Text size="8" weight="bold" className="drop-shadow-md">
                {currentTime}
              </Text>
              <Text size="5" weight="medium" className="mb-1 drop-shadow-md">
                {greeting}
              </Text>
            </Flex>
            <Text
              size="4"
              weight="medium"
              className="drop-shadow-md opacity-90"
            >
              {currentDate}
            </Text>
          </Box>

          {/* 날씨 정보 */}
          {weather && !isLoading && (
            <Flex
              align="center"
              gap="2"
              className="bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              <Box className="text-white">{getWeatherIcon(weather.icon)}</Box>
              <Box>
                <Text size="6" weight="bold">
                  {weather.temp}°C
                </Text>
                <Text size="1" className="opacity-90">
                  {weather.cityName}
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>

      {/* 배경 사진 변경 버튼 */}
      {isHover && (
        <button className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-white/80 hover:bg-white backdrop-blur-sm transition-all shadow-sm">
          배경사진 바꾸기
        </button>
      )}
    </Box>
  );
}
