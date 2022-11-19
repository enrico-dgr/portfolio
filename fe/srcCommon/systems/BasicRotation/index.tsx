import { MathUtils } from 'three';
import { System } from 'common-types/systems';
import { ThreeDataPrimitive, BasicRotations } from 'common-types/entities';

type EState = { action: BasicRotations };

const BasicRotation: System<ThreeDataPrimitive, EState> = ({
	threeData,
	state: eState,
}) => {
	console.log('System: BasicRotation');

	return () => {
		threeData.object.rotation.y = MathUtils.lerp(
			threeData.object.rotation.y,
			eState.action.horizontalTurn,
			0.1
		);
		threeData.object.rotation.x = MathUtils.lerp(
			threeData.object.rotation.x,
			eState.action.verticalTurn,
			0.1
		);
	};
};

export default BasicRotation;
