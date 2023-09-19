use spacetimedb::{spacetimedb, ReducerContext, Timestamp};
pub mod tables;
use tables::*;


impl UserCursor {
  pub fn set_state(&mut self, state: String) {
    self.state = state
  }
}


/***   Init   ***/
  #[spacetimedb(init)]
  pub fn init() {
    // Called when the module is initially published

    // Create our global config table.
    Config::insert(Config {
      version: 0,
      canvas_size: 5000,
      max_nodes: 1000, 
    })
    .expect("Failed to insert config.");
  }


/***   Set users' names   ***/
  #[spacetimedb(reducer)]
  /// Clients invoke this reducer to set their user names.
  pub fn set_name(ctx: ReducerContext, name: String) -> Result<(), String> {
    let name = validate_name(name)?;
    if let Some(user) = UserComp::filter_by_identity(&ctx.sender) {
      UserComp::update_by_identity(&ctx.sender, UserComp { username: Some(name), ..user });
      Ok(())
    } else {
      Err("Cannot set name for unknown user".to_string())
    }
  }

  /// Takes a name and checks if it's acceptable as a user's name.
  fn validate_name(name: String) -> Result<String, String> {
    if name.is_empty() {
      Err("Names must not be empty".to_string())
    } else {
      Ok(name)
    }
  }

  
/***   Set users' online status   ***/
  #[spacetimedb(connect)] // Called when a client connects to the SpacetimeDB
  pub fn identity_connected(ctx: ReducerContext) {
    if let Some(user) = UserComp::filter_by_identity(&ctx.sender) {
      // Set login status
      UserComp::update_by_identity(&ctx.sender, UserComp { 
        online: true,
        time_login: Timestamp::UNIX_EPOCH,
        ..user
      });
    }
  }

  #[spacetimedb(reducer)]
  pub fn create_user(ctx: ReducerContext, username: String) -> Result<(), String> {
    /*
      This reducer is called when the user logs in for the first time and enters a username 
    */
    let identity = ctx.sender;
    if UserComp::filter_by_identity(&identity).is_some() {
      let res = "user already exists".to_string();
      log::info!("{}", res);
      return Err(res);
    }

    // Next we create the SpawnableEntityComponent. The entity_id for this
    // component automatically increments and we get it back from the result
    // of the insert call and use it for all components.
    let entity_id = SpawnableEntityComponent::insert(SpawnableEntityComponent { entity_id: 0 })
      .expect("Failed to create player spawnable entity component.")
      .entity_id;

    // The PlayerComponent uses the same entity_id and stores the identity of 
    // the owner, username, and whether or not they are logged in.
    let name = &username;
    UserComp::insert( UserComp {
      entity_id,
      username: Some(name.to_string()),
      identity: ctx.sender,
      online: true,
      time_register: Timestamp::UNIX_EPOCH,
      time_login: Timestamp::UNIX_EPOCH,
      time_logout: None
    })
    .expect("Failed to insert player component.");
  
    // The MobileLocationComponent is used to calculate the current position
    // of an entity that can move smoothly in the world. We are using 2d
    // positions and the client will use the terrain height for the y value.
    /* Movable::insert(Movable {
      entity_id,
      location: StdbVector2::ZERO
    })
    .expect("Failed to insert player mobile entity component."); */

    log::info!("Player created: {}({})", username, entity_id);

    Ok(())
  }



  #[spacetimedb(disconnect)]
  // Called when a client disconnects from SpacetimeDB
  pub fn identity_disconnected(ctx: ReducerContext) {
    if let Some(user) = UserComp::filter_by_identity(&ctx.sender) {
      UserComp::update_by_identity(&ctx.sender, UserComp { 
        online: false,
        time_logout: Some(Timestamp::UNIX_EPOCH),
        ..user 
      });
    } else {
      // This branch should be unreachable,
      // as it doesn't make sense for a client to disconnect without connecting first. 
      log::warn!("Disconnect event for unknown user with identity {:?}", ctx.sender);
    }
  }


  
/***   Enter Canvas   ***/
  #[spacetimedb(reducer)]
  pub fn enter_canvas(ctx: ReducerContext) { 
  
    if let Some(user) = UserComp::filter_by_identity(&ctx.sender) {
      let entity_id = user.entity_id;

      UserView::insert(UserView {
        entity_id,
        location: StdbVector2::ZERO,
        zoom: 1
      })
      .expect("Failed to insert player mobile entity component.");

      UserCursor::insert(UserCursor {
        entity_id,
        location: StdbVector2::ZERO,
        state: "pointer".to_string()
      })
      .expect("Failed to insert player mobile entity component.");

    } else {
      log::warn!("Disconnect event for unknown user with identity {:?}", ctx.sender);
    }

  }



/***   Motion   ***/
// I should just move location to its own table set
// will be useful if i ever add entities

  #[spacetimedb(reducer)]
  pub fn move_user_view( ctx: ReducerContext, loc: StdbVector2 ) -> Result<(), String> {
    let identity = ctx.sender;
    if let Some(user) = UserComp::filter_by_identity(&identity) {
      if let Some(mut view) = UserView::filter_by_entity_id(&user.entity_id) {
        view.location = loc;
        UserView::update_by_entity_id(&user.entity_id, view);
        return Ok(());
      }
    }

    return Err("Player not found".to_string());
  }

  #[spacetimedb(reducer)]
  pub fn move_cursor( ctx: ReducerContext, loc: StdbVector2 ) -> Result<(), String> {
    let identity = ctx.sender;
    if let Some(user) = UserComp::filter_by_identity(&identity) {
      if let Some(mut cursor) = UserCursor::filter_by_entity_id(&user.entity_id) {
        cursor.location = loc;
        UserCursor::update_by_entity_id(&user.entity_id, cursor);
        return Ok(());
      }
    }

    // If we can not find the PlayerComponent for this user something went wrong.
    // This should never happen.
    return Err("Player not found".to_string());
  }

  #[spacetimedb(reducer)]
  pub fn zoom_user_view( ctx: ReducerContext, zoom: u64 ) -> Result<(), String> {
    let identity = ctx.sender;
    if let Some(user) = UserComp::filter_by_identity(&identity) {
      if let Some(mut view) = UserView::filter_by_entity_id(&user.entity_id) {
        view.zoom = zoom;
        UserView::update_by_entity_id(&user.entity_id, view);
        return Ok(());
      }
    }

    return Err("Player not found".to_string());
  }
  
  