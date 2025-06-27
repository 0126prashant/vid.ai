"use client";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { token, username, logout } = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
      <div className="flex items-center gap-4">
        <Link href="/chat" className="font-bold text-xl tracking-tight">AI Chatbot</Link>
        <Link href="/history" className="text-gray-500 hover:underline text-sm">History</Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {token ? (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">{username}</span>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              onClick={handleLogout}
            >Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-3 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800">Login</Link>
            <Link href="/signup" className="px-3 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
