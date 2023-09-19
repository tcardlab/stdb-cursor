import { ReducerEvent } from "@clockworklabs/spacetimedb-sdk";

// Would be nice if SpacetimeDB exposed such types for building helper functions
interface Table {
  new (...args: any[]): any;
  onInsert: (cb: (value: any, reducerEvent: ReducerEvent | undefined) => void) => void;
  onDelete: (cb: (value: any, reducerEvent: ReducerEvent | undefined) => void) => void;
  onUpdate: (cb: (value: any, oldValue: any, reducerEvent: ReducerEvent | undefined) => void) => void;
  removeOnInsert: (cb: (value: any, reducerEvent: ReducerEvent | undefined) => void) => void;
  removeOnDelete: (cb: (value: any, reducerEvent: ReducerEvent | undefined) => void) => void;
  removeOnUpdate: (cb: (value: any, oldValue: any, reducerEvent: ReducerEvent | undefined) => void) => void;
}

type Red = ReducerEvent | undefined
export function onInsert<T extends Table> (table: T) {
  return (
    cb: (v:InstanceType<T>, red: Red)=>void,
  ) => {
    table.onInsert(cb)
  }
}
