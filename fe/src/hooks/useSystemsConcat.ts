import { useMemo } from 'react';
import { EntityProps } from 'types-l/entities/component';
import { System } from 'types-l/systems';

type Props<EObjects extends {}, EState extends {}, P extends {}> = {
	systems: System<EObjects, EState>[];
	props: EntityProps<EObjects, EState, P>;
};

const useSystemsConcat = <EObjects extends {}, EState extends {}, P extends {}>({
	systems,
	props,
}: Props<EObjects, EState, P>) => {
	const systemsHook = useMemo(
		() => [...systems, ...(props.systems ?? [])],
		[]
	);

	return systemsHook;
};

export default useSystemsConcat;
