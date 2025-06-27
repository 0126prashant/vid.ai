"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const { token } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    router.replace(token ? "/chat" : "/login");
  }, [token]);
  return null;
}
