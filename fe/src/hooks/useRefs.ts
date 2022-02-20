import React from "react";

type Mutable<T> = { current: T };

const fillArrWith = <T>(amount: number, obj: T, objs: T[] = []): T[] => {
	if (objs.length < amount) {
		return fillArrWith(amount, obj, [...objs, { ...obj }]);
	} else {
		return objs;
	}
};

const useRefs = <T, N = undefined | null>(
	amount: number,
	defaultValue: N
): [Mutable<T | N>[], (i: number) => (ref: T) => void] => {
	const [refs, setRefs] = React.useState<Mutable<T | N>[]>(
		fillArrWith<Mutable<T | N>>(amount, { current: defaultValue })
	);

	const addRef = (i: number) => (ref: T) => {
		setRefs((previousRefs) => {
			previousRefs[i].current = ref;
			return previousRefs;
		});
	};

	return [refs, addRef];
};

export default useRefs;
