"use client";
import { useEffect, useRef, useState } from "react";
import { sendChat } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import classNames from "classnames";

interface Message {
  user_message: string;
  ai_message: string;
}

export default function ChatBox() {
  const { token } = useUserStore();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new message arrives
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !token) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setLoading(true);
    try {
      const reply = await sendChat(token, input);
      setMessages(prev => [...prev, { role: "ai", content: reply }]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { role: "ai", content: "AI error: " + (e.response?.data?.error || "Try again.") },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <div className="flex flex-col h-[70vh] border rounded bg-white dark:bg-gray-900 shadow">
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={classNames(
              "whitespace-pre-line",
              msg.role === "user"
                ? "text-right text-blue-700 dark:text-blue-300"
                : "text-left text-gray-900 dark:text-gray-100"
            )}
          >
            <span
              className={classNames(
                "inline-block px-3 py-2 rounded mb-1",
                msg.role === "user"
                  ? "bg-blue-100 dark:bg-blue-800"
                  : "bg-gray-100 dark:bg-gray-700"
              )}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="flex border-t px-2 py-3 dark:border-gray-700 gap-2"
      >
        <input
          className="flex-1 rounded px-3 py-2 border dark:bg-gray-800 dark:border-gray-700"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
