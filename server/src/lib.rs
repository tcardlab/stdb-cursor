use spacetimedb::{spacetimedb, ReducerContext};
pub mod tables;
use tables::*;

/***   Set users' online status   ***/
  #[spacetimedb(connect)]
  // Called when a client connects to the SpacetimeDB
  pub fn identity_connected(ctx: ReducerContext) {
    if let Some(user) = UserComp::filter_by_identity(&ctx.sender) {
      // If this is a returning user, i.e. we already have a `User` with this `Identity`,
      // set `online: true`, but leave `name` and `identity` unchanged.
      UserComp::update_by_identity(&ctx.sender, UserComp { 
        online: true,
        ..user
      });
    } else {
      log::info!("Working as Expected");
      log::info!("Created user comp {:?}", ctx.sender);
      UserComp::insert(UserComp {
        online: true,
        identity: ctx.sender
      })
      .expect("Failed to insert player component.");
    }
  }


  #[spacetimedb(disconnect)]
  // Called when a client disconnects from SpacetimeDB
  pub fn identity_disconnected(ctx: ReducerContext) {
    if let Some(user) = UserComp::filter_by_identity(&ctx.sender) {
      UserComp::update_by_identity(&ctx.sender, UserComp { 
        online: false,
        ..user 
      });
    } else {
      // This branch should be unreachable,
      // as it doesn't make sense for a client to disconnect without connecting first. 
      log::warn!("Disconnect event for unknown user with identity {:?}", ctx.sender);
    }
  }
 