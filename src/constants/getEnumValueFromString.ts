const getEnumValueFromString = <T>(stringValue: string, EnumObject: T): T[keyof T] =>
	EnumObject[stringValue as keyof typeof EnumObject];

export { getEnumValueFromString };
