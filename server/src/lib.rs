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
      // If this is a new user, create a `User` row for the `Identity`,
      // which is online, but hasn't set a name.
      let entity_id = SpawnableEntityComponent::insert(SpawnableEntityComponent { entity_id: 0 })
        .expect("Failed to create player spawnable entity component.")
        .entity_id;
      // getting unique UniqueConstraintViolations, this may just be in a bad spot?

      log::info!("created user with entity_id {:?}", entity_id);

      UserComp::insert(UserComp {
        online: true,
        entity_id: 346576,
        identity: ctx.sender,
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
 