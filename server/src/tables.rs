use spacetimedb::{spacetimedb, Identity};

#[derive(Clone)]
#[spacetimedb(table)]
pub struct User {
  #[primarykey]
  pub identity: Identity,
  pub online: bool
}
