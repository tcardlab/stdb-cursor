use spacetimedb::{spacetimedb, Identity, SpacetimeType, Timestamp};



/***   TYPES   ***/
#[derive(SpacetimeType, Clone)]
pub struct StdbVector2 {
  // A spacetime type which can be used in tables and reducers to represent
  // a 2d position.
  pub x: f32,
  pub z: f32,
}
impl StdbVector2 {
  // this allows us to use StdbVector2::ZERO in reducers
  pub const ZERO: StdbVector2 = StdbVector2 { x: 0.0, z: 0.0 };
}



/***   GLOBAL   ***/
#[spacetimedb(table)]
#[derive(Clone)]
pub struct Config {
  // table with (primarykey === 0) is a single row global state
  #[primarykey]
  pub version: u32,

  /* Init Canvas */
  pub canvas_size: u32,  // X and Y range of the canvas
  pub max_nodes: u32,   // maximum number of resource nodes to spawn on the map
}



/***   TABLES   ***/
#[spacetimedb(table)]
pub struct SpawnableEntityComponent {
  // All entities that can be spawned in the world will have this component.
  // This allows us to find all objects in the world by iterating through
  // this table. It also ensures that all world objects have a unique
  // entity_id.
  #[primarykey]
  #[autoinc]
  pub entity_id: u64,
}


#[derive(Clone)]
#[spacetimedb(table)]
pub struct UserComp {
  // All players have this component and it associates the spawnable entity
  // with the user's identity. It also stores their username.
  #[primarykey]
  pub entity_id: u64,
  #[unique]
  pub identity: Identity,

  pub username: Option<String>,
  pub online: bool,
  pub time_login: Timestamp,
  pub time_logout: Option<Timestamp>,
  pub time_register: Timestamp
}

#[spacetimedb(table)]
#[derive(Clone)]
pub struct Movable {
  #[primarykey]
  pub entity_id: u64,

  pub location: StdbVector2
}


#[spacetimedb(table)]
#[derive(Clone)]
pub struct UserView {
  #[primarykey]
  pub entity_id: u64,
  
  pub location: StdbVector2,
  pub zoom: u64
}


#[spacetimedb(table)]
#[derive(Clone)]
pub struct UserCursor {
  #[primarykey]
  pub entity_id: u64,

  pub location: StdbVector2,
  pub state: String,
}
