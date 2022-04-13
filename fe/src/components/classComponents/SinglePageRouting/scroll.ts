type Listener = (to: string) => void;

let listeningRoutesFuncs: Listener[] = [];

export const addListener = (listener: Listener) =>
	listeningRoutesFuncs.push(listener);

export const removeListener = (listener: Listener) => {
	listeningRoutesFuncs = listeningRoutesFuncs.filter((f) => f !== listener);
};

/**
 *
 * @param to absolute path
 */
const navigate = (to: string) => {
	listeningRoutesFuncs.forEach((f) => f(to));
};

export default navigate;
