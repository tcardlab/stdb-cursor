use spacetimedb::{spacetimedb, Identity};

#[derive(Clone)]
#[spacetimedb(table)]
pub struct UserComp {
  #[primarykey]
  pub identity: Identity,
  pub online: bool
}
