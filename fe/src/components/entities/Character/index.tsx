import entity, { State } from 'common-entities/Character';
import useEntity from 'hooks-l/useEntity';
import { EntityComponent } from 'types-l/entities';

const Character: EntityComponent<State, {}> = ({ children, inputSystems }) => {
	return useEntity({ entityPromise: entity, children, inputSystems });
};

export default Character;
