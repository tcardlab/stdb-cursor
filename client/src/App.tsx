import { SpacetimeDBClient, Identity } from "@clockworklabs/spacetimedb-sdk"; 
import { onMount } from 'solid-js'

import user from './module_bindings/user'

let token = localStorage.getItem('auth_token') || undefined;
let client = new SpacetimeDBClient("wss://testnet.spacetimedb.com", "schemaBug", token);

const App = () => {
  let local_identity: Identity | undefined = undefined;

  client.onConnect((token, identity) => {
    console.log("Connected to SpacetimeDB");

    local_identity = identity;
    localStorage.setItem('auth_token', token);

    client.subscribe([ "SELECT * FROM User" ])
  })
  onMount(()=>{ client.connect() })
  
  // BUG: Uncomment next line
  user.onUpdate((oldUser, user, reducerEvent) => {
    console.log('update working')
    console.log(oldUser, user)
  })
  user.onInsert((userVal, reducerEvent) => {
    console.log('insert working')
    console.log(userVal)
  })


  return (
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: red">
      <h2>see console</h2>
    </div>
  )
}

export default App;
