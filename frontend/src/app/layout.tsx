import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import "./globals.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot",
  description: "Chat with AI, powered by Flask+Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="max-w-2xl mx-auto py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
