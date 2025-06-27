"use client";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ChatHistory from "@/components/ChatHistory";

export default function HistoryPage() {
  const { token } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token]);
  return (
    <div>
      <ChatHistory />
    </div>
  );
}
