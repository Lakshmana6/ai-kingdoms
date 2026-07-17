import type { Character } from './player';
import type { AICitizen, AIGoal } from './ai-citizen';
import type { WorldEvent } from './events';
import type { CombatAction } from './combat';
import type { MarketListing } from './item';

// Events emitted by the SERVER to clients
export interface ServerToClientEvents {
  // World state
  'world:tick': (data: { tick: number; timestamp: number }) => void;
  'world:event': (event: WorldEvent) => void;
  'world:weather': (data: { mapId: string; weather: string }) => void;

  // Player
  'player:update': (character: Partial<Character>) => void;
  'player:xp': (data: { skill: string; amount: number; level: number }) => void;
  'player:message': (data: { type: string; text: string }) => void;
  'player:died': (data: { killedBy: string; position: { x: number; y: number } }) => void;

  // Nearby entities
  'entities:update': (data: { players: unknown[]; citizens: unknown[]; monsters: unknown[] }) => void;

  // Combat
  'combat:action': (action: CombatAction) => void;
  'combat:start': (data: { participants: string[] }) => void;
  'combat:end': (data: { winnerId: string; loserId: string }) => void;

  // Economy
  'market:listing': (listing: MarketListing) => void;
  'market:sold': (data: { listingId: string; buyerId: string }) => void;
  'market:price_update': (data: { itemId: string; price: number }) => void;

  // Chat
  'chat:message': (data: { senderId: string; senderName: string; message: string; channel: string; tick: number }) => void;

  // Admin
  'admin:citizen_thought': (data: { citizenId: string; thought: string; goal: AIGoal | null }) => void;
  'admin:stats': (data: Record<string, unknown>) => void;
}

// Events emitted by the CLIENT to the server
export interface ClientToServerEvents {
  // Movement
  'player:move': (data: { x: number; y: number; mapId: string }) => void;

  // Actions
  'player:action': (data: { type: string; targetId?: string; targetX?: number; targetY?: number; data?: Record<string, unknown> }) => void;

  // Chat
  'chat:send': (data: { message: string; channel: string }) => void;

  // Market
  'market:list_item': (data: { itemInstanceId: string; quantity: number; price: number; marketId: string }) => void;
  'market:buy': (data: { listingId: string; quantity: number }) => void;
  'market:bid': (data: { auctionId: string; amount: number }) => void;

  // Guild
  'guild:create': (data: { name: string; tag: string; charter: string }) => void;
  'guild:invite': (data: { targetId: string }) => void;
  'guild:leave': () => void;

  // Admin
  'admin:spawn_resource': (data: { type: string; x: number; y: number; mapId: string; quantity: number }) => void;
  'admin:trigger_event': (data: { type: string; mapId?: string; severity?: number }) => void;
  'admin:teleport': (data: { entityId: string; x: number; y: number; mapId: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  playerId: string;
  characterId: string;
  role: string;
}
