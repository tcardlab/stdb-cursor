## STDB Typescript Demo

This branch demonstrates how some fringe use-cases lead to
`TableClass` ≠ `typeof TableClass`.
I don't know if this is intentional by TS or if it is simply struggling to infer types vs values of passed classes.

For the most part, `InstanceType<typeof TableClass>` can solve the issue.

<br/>

## Getting Started
```sh
  npm i
  npm publish
  npm run add:User --% "[\"TestUserN\"]"

  # see current results to ensure web will match
  npm run sql "SELECT username FROM UserComp"

  npm run dev
```