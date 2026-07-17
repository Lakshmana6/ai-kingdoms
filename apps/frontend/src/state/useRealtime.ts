import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRealtimeStore } from './realtimeStore';

let socket: ReturnType<typeof io> | null = null;

export function useRealtime() {
  const setTick = useRealtimeStore((s) => s.setTick);
  const pushMessage = useRealtimeStore((s) => s.pushMessage);

  useEffect(() => {
    if (socket) return;

    socket = io(import.meta.env.VITE_WS_URL ?? 'ws://localhost:3000');
    socket.on('world:tick', (data) => setTick(data.tick));
    socket.on('player:message', (message) => pushMessage(message));
    socket.on('chat:message', (message) => pushMessage({ type: message.channel, text: message.message }));

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [pushMessage, setTick]);
}
