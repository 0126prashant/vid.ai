"use client";
import { useState } from "react";
import { login } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(username, password);
      setUser(res);
      router.push("/chat");
    } catch (e: any) {
      setError(e.response?.data?.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md p-6 rounded shadow bg-white dark:bg-gray-900"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <input
        className="w-full px-3 py-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full px-3 py-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
        Login
      </button>
    </form>
  );
}
