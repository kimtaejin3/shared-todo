"use client";

import Image from "next/image";
import LogoImgSrc from "@/assets/images/logo.png";
import UserIcon from "@/components/shared/icons/UserIcon";
import Link from "next/link";
import { Flex, Text, IconButton } from "@radix-ui/themes";
import Notification from "@/components/shared/notification/Notification";

export default function Header() {
  return (
    <header className="py-4">
      <Flex justify="between" align="center">
        <Link href="/" className="cursor-pointer">
          <h1>
            <Flex
              align="center"
              justify="center"
              className="bg-black rounded-full w-8 h-8 flex items-center justify-center"
            >
              <Image
                src={LogoImgSrc}
                alt="Logo"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </Flex>
            <Text className="sr-only">Shared Todo App</Text>
          </h1>
        </Link>
        <Flex gap="4" align="center">
          <Notification />
          <Link href="/profile">
            <IconButton
              variant="ghost"
              radius="full"
              className="w-10 h-10 hover:bg-gray-100 transition-colors duration-200"
              aria-label="프로필"
            >
              <UserIcon width={20} height={20} className="text-black" />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </header>
  );
}
