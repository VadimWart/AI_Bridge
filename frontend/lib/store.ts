import { create } from "zustand";
import { ChatState, Message } from "@/types";

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearChat: () => set({ messages: [], error: null, isLoading: false }),
}));
