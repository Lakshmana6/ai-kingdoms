export type BiomeType = 'forest' | 'plains' | 'mountains' | 'desert' | 'swamp' | 'snow' | 'ocean' | 'river' | 'lake' | 'beach' | 'volcanic' | 'cave' | 'dungeon';

export type TileType =
  | 'grass' | 'dirt' | 'stone' | 'sand' | 'snow' | 'water' | 'deep_water'
  | 'lava' | 'ice' | 'swamp_water' | 'road' | 'floor' | 'wall'
  | 'ore_iron' | 'ore_coal' | 'ore_gold' | 'ore_mithril' | 'ore_adamant' | 'ore_runite'
  | 'tree_oak' | 'tree_willow' | 'tree_maple' | 'tree_yew' | 'tree_magic'
  | 'fishing_spot' | 'herb_patch' | 'farm_plot'
  | 'building_foundation' | 'bridge';

export interface WorldMap {
  id: string;
  name: string;
  width: number;
  height: number;
  biome: BiomeType;
  tiles: Tile[][];
  resources: WorldResource[];
  settlements: string[]; // settlement IDs
  connectedMapIds: MapConnection[];
  weatherEffect: WeatherEffect | null;
  isInstance: boolean;
  seed: number;
}

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  walkable: boolean;
  elevation: number;
  moisture: number;
  resourceId?: string;
  buildingId?: string;
  ownerId?: string;
}

export interface WorldResource {
  id: string;
  type: string;
  x: number;
  y: number;
  mapId: string;
  quantity: number;
  maxQuantity: number;
  respawnTicks: number;
  lastHarvestedTick: number;
  quality: number;
}

export interface MapConnection {
  targetMapId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  type: 'door' | 'portal' | 'transition' | 'boat';
}

export type WeatherEffect = 'rain' | 'snow' | 'drought' | 'storm' | 'fog' | 'blizzard' | 'heatwave' | 'clear';

export interface Settlement {
  id: string;
  name: string;
  type: 'village' | 'town' | 'city' | 'castle' | 'outpost' | 'port';
  x: number;
  y: number;
  mapId: string;
  population: number;
  citizenIds: string[];
  buildingIds: string[];
  resources: Record<string, number>;
  foodSupply: number;
  security: number;    // 0-100
  economy: number;     // 0-100 prosperity
  tradeRoutes: TradeRoute[];
  taxRate: number;     // 0-1
  mayorId: string | null;
  guardCount: number;
  walls: boolean;
  port: boolean;
  level: number;       // 1 = hamlet, 10 = capital
  foundedTick: number;
}

export interface TradeRoute {
  id: string;
  fromSettlementId: string;
  toSettlementId: string;
  goods: { itemId: string; quantity: number }[];
  ownerId: string;
  active: boolean;
  profitPerRun: number;
  lastRunTick: number;
}

export interface Building {
  id: string;
  type: BuildingType;
  name: string;
  x: number;
  y: number;
  mapId: string;
  settlementId: string | null;
  ownerId: string | null;
  level: number;
  health: number;
  maxHealth: number;
  workers: string[];  // citizen IDs
  inventory: Record<string, number>;
  isOperational: boolean;
  constructionProgress: number; // 0-100
  maintenanceCost: number;
  lastMaintenanceTick: number;
  builtTick: number;
}

export type BuildingType =
  | 'house' | 'farm' | 'mine' | 'smithy' | 'tavern' | 'warehouse'
  | 'market' | 'castle' | 'wall' | 'watchtower' | 'dock' | 'bridge'
  | 'guild_hall' | 'temple' | 'library' | 'barracks' | 'stable'
  | 'bakery' | 'lumber_mill' | 'tannery' | 'alchemist_shop' | 'jeweler'
  | 'tailor_shop' | 'fletcher_shop' | 'fishing_hut' | 'hunter_lodge'
  | 'auction_house' | 'bank' | 'town_hall';
