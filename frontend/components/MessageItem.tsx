import React from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
// import { useToast } from '@/hooks/use-toast'; // Assuming standard shadcn toast

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === "user";
  // const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    // toast({ description: "Message copied to clipboard" });
  };

  return (
    <div
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] md:max-w-[70%] gap-3",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground border border-border",
          )}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div
          className={cn(
            "relative group p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-card border border-border text-card-foreground rounded-tl-none",
          )}
        >
          {message.isLoading ? (
            <div className="flex space-x-1 h-5 items-center">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert break-words max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* Actions (Copy) - Only for AI messages and when not loading */}
          {!isUser && !message.isLoading && (
            <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
              >
                <Copy size={12} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
