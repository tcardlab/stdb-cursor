// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, SumType, SumTypeVariant, IDatabaseTable, AlgebraicValue, ReducerEvent, Identity } from "@clockworklabs/spacetimedb-sdk";

export class StdbVector2 extends IDatabaseTable
{
	public static tableName = "StdbVector2";
	public x: number;
	public z: number;

	public static primaryKey: string | undefined = undefined;

	constructor(x: number, z: number) {
	super();
		this.x = x;
		this.z = z;
	}

	public static serialize(value: StdbVector2): object {
		return [
		value.x, value.z
		];
	}

	public static getAlgebraicType(): AlgebraicType
	{
		return AlgebraicType.createProductType([
			new ProductTypeElement("x", AlgebraicType.createPrimitiveType(BuiltinType.Type.F32)),
			new ProductTypeElement("z", AlgebraicType.createPrimitiveType(BuiltinType.Type.F32)),
		]);
	}

	public static fromValue(value: AlgebraicValue): StdbVector2
	{
		let productValue = value.asProductValue();
		let __x = productValue.elements[0].asNumber();
		let __z = productValue.elements[1].asNumber();
		return new this(__x, __z);
	}

}

export default StdbVector2;

__SPACETIMEDB__.registerComponent("StdbVector2", StdbVector2);
