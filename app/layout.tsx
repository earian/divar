import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./ui/bottomNav";

export const metadata: Metadata = {
  title: "دیوار تهران",
  description: "آگهی های خرید و فروش و نیازمندی‌های تهران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`antialiased max-w-[42.18rem] mx-auto`}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
