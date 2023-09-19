// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, SumType, SumTypeVariant, IDatabaseTable, AlgebraicValue, ReducerEvent, Identity } from "@clockworklabs/spacetimedb-sdk";

export class Config extends IDatabaseTable
{
	public static tableName = "Config";
	public version: number;
	public canvasSize: number;
	public maxNodes: number;

	public static primaryKey: string | undefined = "version";

	constructor(version: number, canvasSize: number, maxNodes: number) {
	super();
		this.version = version;
		this.canvasSize = canvasSize;
		this.maxNodes = maxNodes;
	}

	public static serialize(value: Config): object {
		return [
		value.version, value.canvasSize, value.maxNodes
		];
	}

	public static getAlgebraicType(): AlgebraicType
	{
		return AlgebraicType.createProductType([
			new ProductTypeElement("version", AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)),
			new ProductTypeElement("canvas_size", AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)),
			new ProductTypeElement("max_nodes", AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)),
		]);
	}

	public static fromValue(value: AlgebraicValue): Config
	{
		let productValue = value.asProductValue();
		let __version = productValue.elements[0].asNumber();
		let __canvas_size = productValue.elements[1].asNumber();
		let __max_nodes = productValue.elements[2].asNumber();
		return new this(__version, __canvas_size, __max_nodes);
	}

	public static count(): number
	{
		return __SPACETIMEDB__.clientDB.getTable("Config").count();
	}

	public static all(): Config[]
	{
		return __SPACETIMEDB__.clientDB.getTable("Config").getInstances() as unknown as Config[];
	}

	public static filterByVersion(value: number): Config | null
	{
		for(let instance of __SPACETIMEDB__.clientDB.getTable("Config").getInstances())
		{
			if (instance.version === value) {
				return instance;
			}
		}
		return null;
	}

	public static filterByCanvasSize(value: number): Config[]
	{
		let result: Config[] = [];
		for(let instance of __SPACETIMEDB__.clientDB.getTable("Config").getInstances())
		{
			if (instance.canvasSize === value) {
				result.push(instance);
			}
		}
		return result;
	}

	public static filterByMaxNodes(value: number): Config[]
	{
		let result: Config[] = [];
		for(let instance of __SPACETIMEDB__.clientDB.getTable("Config").getInstances())
		{
			if (instance.maxNodes === value) {
				result.push(instance);
			}
		}
		return result;
	}


	public static onInsert(callback: (value: Config, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("Config").onInsert(callback);
	}

	public static onUpdate(callback: (oldValue: Config, newValue: Config, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("Config").onUpdate(callback);
	}

	public static onDelete(callback: (value: Config, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("Config").onDelete(callback);
	}

	public static removeOnInsert(callback: (value: Config, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("Config").removeOnInsert(callback);
	}

	public static removeOnUpdate(callback: (oldValue: Config, newValue: Config, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("Config").removeOnUpdate(callback);
	}

	public static removeOnDelete(callback: (value: Config, reducerEvent: ReducerEvent | undefined) => void)
	{
		__SPACETIMEDB__.clientDB.getTable("Config").removeOnDelete(callback);
	}

}

export default Config;

__SPACETIMEDB__.registerComponent("Config", Config);
