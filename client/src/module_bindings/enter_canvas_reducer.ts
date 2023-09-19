// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, IDatabaseTable, AlgebraicValue, ReducerArgsAdapter, SumTypeVariant, Serializer, Identity, ReducerEvent } from "@clockworklabs/spacetimedb-sdk";

export class EnterCanvasReducer
{
	public static call()
	{
		if (__SPACETIMEDB__.spacetimeDBClient) {
		const serializer = __SPACETIMEDB__.spacetimeDBClient.getSerializer();
			__SPACETIMEDB__.spacetimeDBClient.call("enter_canvas", serializer);
		}
	}

	public static deserializeArgs(_adapter: ReducerArgsAdapter): any[] {
		return [];
	}

	public static on(callback: (reducerEvent: ReducerEvent, reducerArgs: any[]) => void)
	{
		if (__SPACETIMEDB__.spacetimeDBClient) {
			__SPACETIMEDB__.spacetimeDBClient.on("reducer:EnterCanvas", callback);
		}
	}
}

__SPACETIMEDB__.reducers.set("EnterCanvas", EnterCanvasReducer);
if (__SPACETIMEDB__.spacetimeDBClient) {
	__SPACETIMEDB__.spacetimeDBClient.registerReducer("EnterCanvas", EnterCanvasReducer);
}

export default EnterCanvasReducer
