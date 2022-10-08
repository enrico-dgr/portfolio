import React from 'react';

export type State<Entity, EntityState> =
	| {
			entity: Entity;
			eState: EntityState;
	  }
	| undefined;

export type EntityProps<Entity, EntityState> = {
	children?: React.ReactNode;
	getState?: (state: State<Entity, EntityState>) => void;
};

export type EntityComponent<Entity, EntityState, Props extends {} = {}> = (
	props: EntityProps<Entity, EntityState> & Props,
) => JSX.Element;
