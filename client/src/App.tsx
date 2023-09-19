let token = localStorage.getItem('auth_token') || undefined;
let client = new SpacetimeDBClient("wss://testnet.spacetimedb.com", "TSDemo", token);

const App = () => {
  let [users, setUsers] = createStore<Record<string, UserComp>>({})
  let onInsertUser = onInsert(UserComp)
  onInsertUser((v, e)=>{
    let ID = v.identity.toHexString()
    setUsers(ID, v)
  })

  let local_identity: Identity | undefined = undefined;
  client.onConnect((token, identity) => {
      console.log("Connected to SpacetimeDB");
      local_identity = identity;
      localStorage.setItem('auth_token', token);
      client.subscribe([ "SELECT * FROM UserComp" ])
  })
  onMount(()=>client.connect())

  return (
    <div style="display: flex; justify-content: center; align-items: center; height: 100%">
      <p>
        Users: {Object.values(users).map(u=>u.username).join(', ')}
      </p>
    </div>
  )
}

export default App;
