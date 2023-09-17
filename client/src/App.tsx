import { SpacetimeDBClient } from "@clockworklabs/spacetimedb-sdk"; 
import { onMount } from 'solid-js'

import userComp from './module_bindings/user_comp'

let token = localStorage.getItem('auth_token') || undefined;
let client = new SpacetimeDBClient("wss://testnet.spacetimedb.com", "onUpdateBug", token);

const App = () => {
  client.onConnect((token, identity) => {
    console.log("Connected to SpacetimeDB");
    client.subscribe([ "SELECT * FROM UserComp" ])
  })
  onMount(()=>{ client.connect() })
  
  // BUG: Uncomment next line
  // userComp.onUpdate((oldUser, user, reducerEvent) => {})

  return (
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: red">
      <h2>see console</h2>
    </div>
  )
}

export default App;
