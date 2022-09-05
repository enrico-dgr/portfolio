import React from 'react';

export type State<Entity, EntityState> =
	| {
			entity: Entity;
			eState: EntityState;
	  }
	| undefined;

export type Props<Entity, EntityState> = {
	children?: React.ReactNode;
	getState?: (state: State<Entity, EntityState>) => void;
};

export type EntityComponent<Entity, EntityState> = (
	props: Props<Entity, EntityState>,
) => JSX.Element;
