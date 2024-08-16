import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNav } from "../../topNav";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "./_components/footer";
import Head from "next/head";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClosetClear",
  description: "an App created during Hack Week at SALT, by Nils Hansson Meng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={spaceGrotesk.className}>
          <TopNav />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
