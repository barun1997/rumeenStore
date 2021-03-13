const getValuesForEnum = <T>(enumObject: T): string[] =>
	Object.keys(enumObject).filter((key) => isNaN(Number(key)));

export { getValuesForEnum };
