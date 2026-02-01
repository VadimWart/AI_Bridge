import React, { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/store";

export const MessageList: React.FC = () => {
  const { messages, isLoading } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or loading state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 min-h-0 p-4 pr-6">
      <div className="flex flex-col min-h-full justify-end py-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-4 min-h-[50vh]">
            <p className="text-lg font-medium">AI Bridge Chat</p>
            <p className="text-sm">Start a conversation...</p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}

        {/* Loading Indicator (if loading but no partial message added yet) */}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex w-full mb-6 justify-start">
            <div className="flex max-w-[80%] gap-3 flex-row">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground border border-border flex items-center justify-center shrink-0">
                <div className="w-4 h-4" /> {/* Placeholder for Bot icon */}
              </div>
              <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex space-x-1 h-5 items-center">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-4" />
      </div>
    </ScrollArea>
  );
};
