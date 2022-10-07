import React, { useCallback, useState } from 'react';
import { keyMap, KeyMapKeys } from '../../../../constants/defaultSettings';
import { PointerLockControls } from 'three-stdlib';
import { useThree } from '@react-three/fiber';

type State = {
	requestsToUnlock: string[];
	controls: PointerLockControls;
};

const PointerLockCtrl = () => {
	const camera = useThree((s) => s.camera);
	const gl = useThree((s) => s.gl);

	const [state] = useState<State>({
		requestsToUnlock: [],
		controls: new PointerLockControls(camera, gl.domElement),
	});

	const checkRequest = useCallback((key: string) => {
		const indexRequest = state.requestsToUnlock.findIndex((v) => v === key);

		if (indexRequest < 0) {
			state.requestsToUnlock.push(key);
		}

		if (state.controls.isLocked) {
			// show cursor
			state.controls.unlock();
		} else {
			if (indexRequest > -1) {
				state.requestsToUnlock = [
					...state.requestsToUnlock.slice(0, indexRequest),
					...state.requestsToUnlock.slice(indexRequest + 1),
				];
			}

			if (state.requestsToUnlock.length === 0) {
				// hide cursor
				state.controls.lock();
			}
		}
	}, []);

	React.useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			const keys: Extract<KeyMapKeys, 'menu'>[] = ['menu'];

			for (const key of keys) {
				if (keyMap[key] === e.key) {
					checkRequest(key);
				}
			}
		};

		document.body.addEventListener('click', () => {
			state.controls.lock();
		});

		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return <></>;
};

export default PointerLockCtrl;
