import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useChatStore } from '@/lib/store';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  return (
    <div className="p-4 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto relative flex items-end gap-2 p-2 rounded-xl border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Bridge..."
          className="flex-1 w-full bg-transparent border-0 focus:ring-0 resize-none max-h-[200px] min-h-[44px] py-3 px-2 text-sm outline-none"
          disabled={isLoading}
          rows={1}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={cn(
            "mb-1 shrink-0 rounded-lg transition-all duration-200",
            input.trim() && !isLoading
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isLoading ? (
            <span className="animate-spin">⟳</span>
          ) : (
            <Send size={18} />
          )}
        </Button>
      </div>
      <div className="text-center mt-2">
        <p className="text-[10px] text-muted-foreground">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};
