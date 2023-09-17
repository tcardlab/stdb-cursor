use spacetimedb::{spacetimedb, Identity};


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
  pub online: bool
}
