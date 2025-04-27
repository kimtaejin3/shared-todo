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
           <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
            <Image src={NotificationSvgSrc} alt="Notification" width={14} height={14} />
           </button>
           <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
            <Image src={UserSvgSrc} alt="User" width={14} height={14} />
           </button> 
        </div>
    </header>
  )
}