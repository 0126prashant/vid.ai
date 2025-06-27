"use client";
import { useEffect, useState } from "react";
import { getHistory } from "@/lib/api";
import { useUserStore } from "@/store/userStore";

interface ChatHistoryEntry {
  user_message: string;
  ai_message: string;
  timestamp: string;
}

export default function ChatHistory() {
  const { token } = useUserStore();
  const [history, setHistory] = useState<ChatHistoryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    getHistory(token)
      .then(setHistory)
      .catch(e => setError(e.response?.data?.error || "Failed to load history"));
  }, [token]);

  if (!token) return null;
  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow p-4">
      <h2 className="text-lg font-bold mb-3">Chat History</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {history.length === 0 && <div className="text-gray-500">No history yet.</div>}
        {history.map((entry, idx) => (
          <div key={idx} className="border-b pb-2 mb-2">
            <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
              You: {entry.user_message}
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-100">
              AI: {entry.ai_message}
            </div>
            <div className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
