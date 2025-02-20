import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import JotaiProvider from "@/provider/jotai-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "호잇 관리자",
  description: "이미지 업로드",
};

type Props = {
  children: ReactNode;
  imglist: ReactNode;
};

export default function RootLayout({ children, imglist }: Readonly<Props>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-8 antialiased`}
      >
        <JotaiProvider>
          <h1 className="mb-4 text-lg font-bold">HOIT ADMIN</h1>
          <section className="mx-auto flex flex-col gap-6 md:flex-row">
            {children}
            {imglist}
          </section>
        </JotaiProvider>
      </body>
    </html>
  );
}
