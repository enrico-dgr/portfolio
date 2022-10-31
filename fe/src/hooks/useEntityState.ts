import { useCallback, useEffect, useState } from 'react';
import { EntityProps, State } from 'types-l/entities/component';

type Props<Entity extends {}, EState extends {}> = {
	state: State<Entity, EState>;
	props: EntityProps<Entity, EState>;
};

/**
 * Extends lower entity's state with current one or create
 * a new state instance if no one is updated from `setState`
 * @param props
 */
const useEntityState = <Entity extends {}, EState extends {}>(
	props: Props<Entity, EState>
): [State<Entity, EState>, (s: State<Entity, EState>) => void] => {
	const [stateHook, setStateHook] = useState(props.state);

	const getState = useCallback((s: State<Entity, EState>) => {
		if (!!s) {
			if (!!stateHook) {
				Object.assign(s.entity, stateHook.entity);
				Object.assign(s.eState, stateHook.eState);
			}
			setStateHook(s);
		}
	}, []);

	useEffect(() => {
		props.props.getState && props.props.getState(stateHook);
	}, [stateHook]);

	return [stateHook, getState];
};

export default useEntityState;
