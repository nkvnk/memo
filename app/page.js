"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, UserPlus, MoreVertical, Pencil } from "lucide-react";
import Image from "next/image";

export default function MemoPage() {
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef(null);
  const [lastDate, setLastDate] = useState(null);

  // Load memo from localStorage when the component mounts
  useEffect(() => {
    const savedMemo = localStorage.getItem("memo");
    if (savedMemo) {
      setMemo(savedMemo);
    }
  }, []);

  // Save memo to localStorage whenever it changes
  useEffect(() => {
    if (memo) {
      setSaving(true);
      localStorage.setItem("memo", memo);
      const timer = setTimeout(() => {
        setSaving(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [memo]);

  const handlePencilClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleMemoChange = (e) => {
    const currentDate = new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (lastDate !== currentDate) {
      setMemo((prev) => {
        const dateString = `\n\n${currentDate}\n`;
        return (
          prev +
          (prev ? dateString : currentDate + "\n") +
          e.target.value.slice(prev.length)
        );
      });
      setLastDate(currentDate);
    } else {
      setMemo(e.target.value);
    }
  };

  return (
    <main className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 flex flex-col items-center">
        <div className="flex items-center">
          <Image
            src="/memo.png"
            alt="Notes"
            width={47}
            height={45}
            className="mr-2 mt-1"
          />
          <h1 className="font-bold text-custom-lg">ThinkTank</h1>
        </div>
        <div className="w-full mt-2 border-b-2 border-black"></div>
      </header>

      {/* Saving indicator */}
      <div className="bg-white px-4 text-sm text-gray-500">
        {saving ? "保存中..." : ""}
      </div>

      {/* Memo input */}
      <textarea
        ref={textareaRef}
        className="flex-grow p-4 text-xl focus:outline-none resize-none"
        value={memo}
        onChange={handleMemoChange}
        placeholder="メモを入力してください..."
      />

      {/* Footer */}
      <footer className="bg-white p-4 flex justify-end">
        <button
          className="bg-gray-200 rounded-full p-3"
          onClick={handlePencilClick}
        >
          <Pencil className="w-8 h-8 text-gray-600" />
        </button>
      </footer>
    </main>
  );
}
