// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, SumType, SumTypeVariant, IDatabaseTable, AlgebraicValue, ReducerEvent, Identity } from "@clockworklabs/spacetimedb-sdk";
// @ts-ignore
import { StdbVector2 } from "./stdb_vector_2";

export class UserCursor extends IDatabaseTable
{
	public static tableName = "UserCursor";
	public entityId: number;
	public location: StdbVector2;
	public state: string;

	public static primaryKey: string | undefined = "entityId";

	constructor(entityId: number, location: StdbVector2, state: string) {
	super();
		this.entityId = entityId;
		this.location = location;
		this.state = state;
	}

	public static serialize(value: UserCursor): object {
		return [
		value.entityId, StdbVector2.serialize(value.location), value.state
		];
	}

	public static getAlgebraicType(): AlgebraicType
	{
		return AlgebraicType.createProductType([
			new ProductTypeElement("entity_id", AlgebraicType.createPrimitiveType(BuiltinType.Type.U64)),
			new ProductTypeElement("location", StdbVector2.getAlgebraicType()),
			new ProductTypeElement("state", AlgebraicType.createPrimitiveType(BuiltinType.Type.String)),
		]);
	}

	public static fromValue(value: AlgebraicValue): UserCursor
	{
		let productValue = value.asProductValue();
		let __entity_id = productValue.elements[0].asNumber();
		let __location = StdbVector2.fromValue(productValue.elements[1]);
		let __state = productValue.elements[2].asString();
		return new this(__entity_id, __location, __state);
	}

	public static count(): number
	{
		return __SPACETIMEDB__.clientDB.getTable("UserCursor").count();
	}

	public static all(): UserCursor[]
	{
		return __SPACETIMEDB__.clientDB.getTable("UserCursor").getInstances() as unknown as UserCursor[];
	}

	public static filterByEntityId(value: number): UserCursor | null
	{
		for(let instance of __SPACETIMEDB__.clientDB.getTable("UserCursor").getInstances())
		{
			if (instance.entityId === value) {
				return instance;
			}
		}
		return null;
	}

	public static filterByState(value: string): UserCursor[]
	{
		let result: UserCursor[] = [];
		for(let instance of __SPACETIMEDB__.clientDB.getTable("UserCursor").getInstances())
		{
			if (instance.state === value) {
				result.push(instance);
			}
		}
		return result;
	}


	public static onInsert(callback: (value: UserCursor, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserCursor").onInsert(callback);
	}

	public static onUpdate(callback: (oldValue: UserCursor, newValue: UserCursor, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserCursor").onUpdate(callback);
	}

	public static onDelete(callback: (value: UserCursor, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserCursor").onDelete(callback);
	}

	public static removeOnInsert(callback: (value: UserCursor, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserCursor").removeOnInsert(callback);
	}

	public static removeOnUpdate(callback: (oldValue: UserCursor, newValue: UserCursor, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserCursor").removeOnUpdate(callback);
	}

	public static removeOnDelete(callback: (value: UserCursor, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("UserCursor").removeOnDelete(callback);
	}

}

export default UserCursor;

__SPACETIMEDB__.registerComponent("UserCursor", UserCursor);
