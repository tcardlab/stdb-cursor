// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, IDatabaseTable, AlgebraicValue, ReducerArgsAdapter, SumTypeVariant, Serializer, Identity, ReducerEvent } from "@clockworklabs/spacetimedb-sdk";

export class ZoomUserViewReducer
{
	public static call(_zoom: number)
	{
		if (__SPACETIMEDB__.spacetimeDBClient) {
		const serializer = __SPACETIMEDB__.spacetimeDBClient.getSerializer();
		let _zoomType = AlgebraicType.createPrimitiveType(BuiltinType.Type.U64);
		serializer.write(_zoomType, _zoom);
			__SPACETIMEDB__.spacetimeDBClient.call("zoom_user_view", serializer);
		}
	}

	public static deserializeArgs(adapter: ReducerArgsAdapter): any[] {
		let zoomType = AlgebraicType.createPrimitiveType(BuiltinType.Type.U64);
		let zoomValue = AlgebraicValue.deserialize(zoomType, adapter.next())
		let zoom = zoomValue.asNumber();
		return [zoom];
	}

	public static on(callback: (reducerEvent: ReducerEvent, reducerArgs: any[]) => void)
	{
		if (__SPACETIMEDB__.spacetimeDBClient) {
			__SPACETIMEDB__.spacetimeDBClient.on("reducer:ZoomUserView", callback);
		}
	}
}

__SPACETIMEDB__.reducers.set("ZoomUserView", ZoomUserViewReducer);
if (__SPACETIMEDB__.spacetimeDBClient) {
	__SPACETIMEDB__.spacetimeDBClient.registerReducer("ZoomUserView", ZoomUserViewReducer);
}

export default ZoomUserViewReducer