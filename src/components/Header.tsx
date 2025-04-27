import Image from "next/image";
import LogoImgSrc from "@/assets/logo.png"
import NotificationSvgSrc from "@/assets/icons/notification.svg"
import UserSvgSrc from "@/assets/icons/user.svg"

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
        <h1>
            <Image src={LogoImgSrc} alt="Logo" width={32} height={32} />
            <span className="sr-only">Shared Todo App</span>
        </h1>
        <div className="flex items-center gap-3">
           <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
            <Image src={NotificationSvgSrc} alt="Notification" width={13} height={13} />
           </button>
           <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
            <Image src={UserSvgSrc} alt="User" width={13} height={13} />
           </button> 
        </div>
    </header>
  )
}