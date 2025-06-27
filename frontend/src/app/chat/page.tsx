"use client";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import ChatBox from "@/components/ChatBox";
import { useEffect } from "react";

export default function ChatPage() {
  const { token } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token]);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">AI Chat</h1>
      <ChatBox />
    </div>
  );
}
