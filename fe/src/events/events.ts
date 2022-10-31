type EventsTypes = 'unlockPointer' | 'lockPointer';

type EventPrimitive<T extends EventsTypes, D extends {}> = { type: T; data: D };

export type PointerLockEvent = EventPrimitive<
	'lockPointer',
	{
		subscriberName: string;
	}
>;

export type PointerUnlockEvent = EventPrimitive<
	'unlockPointer',
	{
		subscriberName: string;
	}
>;

type GameEvent = PointerLockEvent | PointerUnlockEvent;

type Listener<T extends EventsTypes> = (
	event: Extract<GameEvent, EventPrimitive<T, {}>>['data'],
) => void;

const listeners: { [K in EventsTypes]: Listener<K>[] } = {
	lockPointer: [],
	unlockPointer: [],
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
	listeners[event.type].forEach((l) => l(event.data));
};

export default {
	dispatch,
	addListener,
	removeListener,
};