export type GuildRank = 'leader' | 'officer' | 'veteran' | 'member' | 'recruit' | 'initiate';

export interface Guild {
  id: string;
  name: string;
  tag: string;           // Short 2-4 char tag
  description: string;
  leaderId: string;
  memberIds: string[];
  officerIds: string[];
  guildHallId: string | null;
  storageInventory: Record<string, number>;
  wealth: number;
  level: number;
  xp: number;
  reputation: number;
  wars: GuildWar[];
  alliances: string[];   // guild IDs
  founded: number;       // tick
  isPlayerGuild: boolean;
  ranks: GuildMemberRank[];
  maxMembers: number;
  recruitmentOpen: boolean;
  charter: string;
}

export interface GuildMemberRank {
  memberId: string;
  rank: GuildRank;
  joinedTick: number;
  contribution: number;
}

export interface GuildWar {
  id: string;
  attackingGuildId: string;
  defendingGuildId: string;
  startTick: number;
  endTick?: number;
  attackerKills: number;
  defenderKills: number;
  status: 'active' | 'truce' | 'ended';
  terms?: string;
  victor?: string; // guild ID
}

export interface GuildElection {
  id: string;
  guildId: string;
  candidates: string[];    // citizen IDs
  votes: Record<string, string>; // voterId -> candidateId
  startTick: number;
  endTick: number;
  winner?: string;
  complete: boolean;
}
