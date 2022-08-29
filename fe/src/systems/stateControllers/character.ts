import { ParentState } from "../../types/systems";

type State = 'idle' | 'walk';

const update = (
	keyInParentState: string,
	newState: State,
	state: ParentState<typeof keyInParentState, State>,
) => {
	state[keyInParentState].prev = state[keyInParentState].cur;
	state[keyInParentState].cur = newState;

  return state;
};
