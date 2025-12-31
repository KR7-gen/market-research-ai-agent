import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "市場調査レポート生成ツール",
  description: "Deep Research型 市場調査レポート生成ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
