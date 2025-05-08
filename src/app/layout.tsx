import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "투두투게더",
  description:
    "친구들과 함께 투두리스트를 공유해봐요. 함께 응원도 주고받을 수 있어요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
