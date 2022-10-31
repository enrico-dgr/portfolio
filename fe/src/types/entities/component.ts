import React from 'react';
import { System } from 'types-l/systems';

export type State<Entity, EntityState> =
	| {
			entity: Entity;
			eState: EntityState;
	  }
	| undefined;

export type EntityProps<
	Entity extends {},
	EntityState extends {},
	Props extends {}
> = {
	children?: React.ReactNode;
	getState?: (state: State<Entity, EntityState>) => void;
	systems?: System<Entity, EntityState>[];
} & Props;

export type EntityComponent<
	Entity extends {},
	EntityState extends {},
	Props extends {} = {}
> = (props: EntityProps<Entity, EntityState, Props>) => JSX.Element;
