import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CaseCellShop - As melhores capinhas do Brasil",
  description: "As melhores capinhas do Brasil",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
