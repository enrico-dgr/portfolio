type EventsTypes = 'requestPointerLock' | 'requestPointerUnlock';

interface EventPrimitive<T extends EventsTypes, D extends {}> {
	type: T;
	data: D;
}

type PointerLockEvent = EventPrimitive<
	'requestPointerLock' | 'requestPointerUnlock',
	{
		subscriberName: string;
	}
>;

type GameEvent = PointerLockEvent;

type Listener<T extends EventsTypes> = (
	event: Extract<
		GameEvent,
		{
			type: T;
		}
	>,
) => void;

const listeners: { [K in EventsTypes]: Listener<K>[] } = {
	requestPointerLock: [],
	requestPointerUnlock: [],
};

const addListener = <T extends EventsTypes>(type: T, listener: Listener<T>) => {
	listeners[type].push(listener);
};

const removeListener = <T extends EventsTypes>(
	type: T,
	listener: Listener<T>,
) => {
	listeners[type].splice(
		listeners[type].findIndex((l) => l === listener),
		1,
	);
};

const dispatch = (event: GameEvent) => {
	listeners[event.type].forEach((l) =>
		(l as Listener<typeof event.type>)(event),
	);
};

export default {
	dispatch,
	addListener,
	removeListener,
};
