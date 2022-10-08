import { useThree } from '@react-three/fiber';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import events, {
	PointerLockEvent,
	PointerUnlockEvent,
} from '../../../../events/events';

type State = {
	requestsToUnlock: string[];
};

const PointerLockCtrl = () => {
	const gl = useThree((s) => s.gl);

	const [state] = useState<State>({
		requestsToUnlock: [],
	});

	const controls = useMemo(
		() => ({
			lock: () => gl.domElement.requestPointerLock(),
			unlock: () => gl.domElement.ownerDocument.exitPointerLock(),
		}),
		[],
	);

	const onUnlock = useCallback((e: PointerUnlockEvent['data']) => {
		const indexRequest = state.requestsToUnlock.findIndex(
			(v) => v === e.subscriberName,
		);

		if (indexRequest < 0) {
			state.requestsToUnlock.push(e.subscriberName);
		}

		if (!!document.pointerLockElement) {
			controls.unlock();
		}
	}, []);

	const onLock = useCallback((e: PointerLockEvent['data']) => {
		const indexRequest = state.requestsToUnlock.findIndex(
			(v) => v === e.subscriberName,
		);

		if (indexRequest > -1) {
			state.requestsToUnlock.splice(indexRequest, 1);
		}

		if (state.requestsToUnlock.length === 0) {
			controls.lock();
		}
	}, []);
	
  useEffect(() => {
		events.addListener('lockPointer', onLock);
		events.addListener('unlockPointer', onUnlock);

		return () => {
			events.removeListener('lockPointer', onLock);
			events.removeListener('unlockPointer', onUnlock);
		};
	}, []);

	return <></>;
};

export default PointerLockCtrl;
