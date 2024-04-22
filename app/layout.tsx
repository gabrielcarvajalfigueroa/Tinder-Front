import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import NavBar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tinder UCN",
  description: "Tinder UCN app for finding study partners ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
					inter.className,
					"min-h-screen overscroll-none bg-background"
				)}>
        <ApolloWrapper>
            <NavBar>
            </NavBar>
            {children}
        </ApolloWrapper>
        </body>
    </html>
  );
}
