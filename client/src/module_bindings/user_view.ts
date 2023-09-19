// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, SumType, SumTypeVariant, IDatabaseTable, AlgebraicValue, ReducerEvent, Identity } from "@clockworklabs/spacetimedb-sdk";
// @ts-ignore
import { StdbVector2 } from "./stdb_vector_2";

export class UserView extends IDatabaseTable
{
	public static tableName = "UserView";
	public entityId: number;
	public location: StdbVector2;
	public zoom: number;

	public static primaryKey: string | undefined = "entityId";

	constructor(entityId: number, location: StdbVector2, zoom: number) {
	super();
		this.entityId = entityId;
		this.location = location;
		this.zoom = zoom;
	}

	public static serialize(value: UserView): object {
		return [
		value.entityId, StdbVector2.serialize(value.location), value.zoom
		];
	}

	public static getAlgebraicType(): AlgebraicType
	{
		return AlgebraicType.createProductType([
			new ProductTypeElement("entity_id", AlgebraicType.createPrimitiveType(BuiltinType.Type.U64)),
			new ProductTypeElement("location", StdbVector2.getAlgebraicType()),
			new ProductTypeElement("zoom", AlgebraicType.createPrimitiveType(BuiltinType.Type.U64)),
		]);
	}

	public static fromValue(value: AlgebraicValue): UserView
	{
		let productValue = value.asProductValue();
		let __entity_id = productValue.elements[0].asNumber();
		let __location = StdbVector2.fromValue(productValue.elements[1]);
		let __zoom = productValue.elements[2].asNumber();
		return new this(__entity_id, __location, __zoom);
	}

	public static count(): number
	{
		return __SPACETIMEDB__.clientDB.getTable("UserView").count();
	}

	public static all(): UserView[]
	{
		return __SPACETIMEDB__.clientDB.getTable("UserView").getInstances() as unknown as UserView[];
	}

	public static filterByEntityId(value: number): UserView | null
	{
		for(let instance of __SPACETIMEDB__.clientDB.getTable("UserView").getInstances())
		{
			if (instance.entityId === value) {
				return instance;
			}
		}
		return null;
	}

	public static filterByZoom(value: number): UserView[]
	{
		let result: UserView[] = [];
		for(let instance of __SPACETIMEDB__.clientDB.getTable("UserView").getInstances())
		{
			if (instance.zoom === value) {
				result.push(instance);
			}
		}
		return result;
	}


	public static onInsert(callback: (value: UserView, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserView").onInsert(callback);
	}

	public static onUpdate(callback: (oldValue: UserView, newValue: UserView, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserView").onUpdate(callback);
	}

	public static onDelete(callback: (value: UserView, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserView").onDelete(callback);
	}

	public static removeOnInsert(callback: (value: UserView, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserView").removeOnInsert(callback);
	}

	public static removeOnUpdate(callback: (oldValue: UserView, newValue: UserView, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserView").removeOnUpdate(callback);
	}

	public static removeOnDelete(callback: (value: UserView, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserView").removeOnDelete(callback);
	}

}

export default UserView;

__SPACETIMEDB__.registerComponent("UserView", UserView);
