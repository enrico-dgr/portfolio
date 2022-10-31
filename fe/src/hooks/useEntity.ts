import { useCallback, useEffect, useState } from 'react';
import { EntityProps, Entity } from 'types-l/entities/component';

type Props<EObjects extends {}, EState extends {}, P extends {}> = {
	entity: Entity<EObjects, EState>;
	props: EntityProps<EObjects, EState, P>;
};

/**
 * Extends lower entity's state with current one or create
 * a new state instance if no one is updated from `setState`
 * @param props
 */
const useEntity = <EObjects extends {}, EState extends {}, P extends {}>(
	props: Props<EObjects, EState, P>
): [Entity<EObjects, EState>, (s: Entity<EObjects, EState>) => void] => {
	const [entity, setStateHook] = useState(props.entity);

	const getState = useCallback((s: Entity<EObjects, EState>) => {
		if (!!s) {
			if (!!entity) {
				Object.assign(s.objects, entity.objects);
				Object.assign(s.state, entity.state);
			}
			setStateHook(s);
		}
	}, []);

	useEffect(() => {
		props.props.setEntity && props.props.setEntity(entity);
	}, [entity]);

	return [entity, getState];
};

export default useEntity;
