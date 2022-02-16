import { configureStore } from "@reduxjs/toolkit";

import reducer from "./redux/reducers";

// ------------------------
// EXPORTS
// ------------------------

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
/**
 * Inferred type from reducers
 */
export type AppDispatch = typeof store.dispatch;

export default { store };
