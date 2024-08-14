import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNav } from "./_components/TopNav";
import { ClerkProvider } from "@clerk/nextjs";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClosetClear",
  description: "an App created during Hack Week at SALT, by Nils Hansson Meng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={spaceGrotesk.className}>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
