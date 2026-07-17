import { create } from 'zustand';

interface Message {
  type: string;
  text: string;
}

interface RealtimeState {
  tick: number;
  messages: Message[];
  setTick: (tick: number) => void;
  pushMessage: (message: Message) => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  tick: 0,
  messages: [],
  setTick: (tick) => set({ tick }),
  pushMessage: (message) => set((state) => ({ messages: [...state.messages.slice(-50), message] })),
}));
