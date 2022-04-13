import { Action } from "@reduxjs/toolkit";

const INIT_STATE = {};

const exampleDuck = (state = INIT_STATE, action: Action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default exampleDuck;
