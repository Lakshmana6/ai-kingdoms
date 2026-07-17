export const WORLD_CONFIG = {
  DEFAULT_MAP_WIDTH: 512,
  DEFAULT_MAP_HEIGHT: 512,
  TILE_SIZE: 32,
  CHUNK_SIZE: 16,
  MAX_MAPS: 100,
  DAY_LENGTH_TICKS: 1440,   // 1440 ticks = 1 game day (1 tick/sec = 24 min real time)
  YEAR_LENGTH_DAYS: 360,
  SPAWN_X: 256,
  SPAWN_Y: 256,
  SPAWN_MAP: 'world_overworld',
};

export const BIOME_WEIGHTS = {
  forest: 0.25,
  plains: 0.20,
  mountains: 0.15,
  desert: 0.10,
  swamp: 0.08,
  snow: 0.08,
  ocean: 0.07,
  river: 0.04,
  lake: 0.03,
};

export const RESOURCE_RESPAWN_TICKS = {
  copper_ore: 100,
  iron_ore: 120,
  coal: 150,
  gold_ore: 200,
  mithril_ore: 300,
  adamant_ore: 450,
  runite_ore: 720,
  logs: 80,
  oak_logs: 100,
  willow_logs: 120,
  maple_logs: 160,
  yew_logs: 200,
  magic_logs: 360,
  herb_ranarr: 200,
  herb_snapdragon: 300,
};
