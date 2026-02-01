"use client";

import React, { useEffect } from "react";
import { useChatStore } from "@/lib/store";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import api from "@/lib/api";

// Simple ID generator
const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const ChatContainer: React.FC = () => {
  const { addMessage, setLoading, isLoading, setError } = useChatStore();
  // const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    const userMsgId = generateId();
    addMessage({
      id: userMsgId,
      role: "user",
      content,
      timestamp: Date.now(),
    });

    setLoading(true);

    try {
      // Optimistic AI message (optional, or just wait)

      const response = await api.post("/requests", { prompt: content });

      // Assuming response.data contains the markdown answer.
      // Adjust based on actual API shape.
      // Example: { answer: "Hello..." } or just the string?
      // Requirement says "POST /requests with Prompt".
      // I will assume it returns { response: string } or similar.
      const aiContent =
        response.data?.answer ||
        response.data?.response ||
        response.data?.message ||
        JSON.stringify(response.data);

      addMessage({
        id: generateId(),
        role: "assistant",
        content: aiContent,
        timestamp: Date.now(),
      });
    } catch (err: unknown) {
      console.error("Chat Error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
      // toast({ variant: "destructive", title: "Error", description: "Failed to get response from AI." });

      addMessage({
        id: generateId(),
        role: "assistant",
        content:
          "**Error:** Failed to communicate with the server. Please try again.",
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <h1 className="font-semibold text-lg tracking-tight">AI Bridge</h1>
      </header>

      {/* Messages Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <MessageList />
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>

      {/* <Toaster /> */}
    </div>
  );
};
