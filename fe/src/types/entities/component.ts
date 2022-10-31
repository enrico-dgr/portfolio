import React from 'react';
import { System } from 'types-l/systems';

export type Entity<EObjects, EState> =
	| {
			objects: EObjects;
			state: EState;
	  }
	| undefined;

export type EntityProps<
	EObjects extends {},
	EState extends {},
	Props extends {}
> = {
	children?: React.ReactNode;
	setEntity?: (state: Entity<EObjects, EState>) => void;
	systems?: System<EObjects, EState>[];
} & Props;

export type EntityComponent<
	EObjects extends {},
	EState extends {},
	Props extends {} = {}
> = (props: EntityProps<EObjects, EState, Props>) => JSX.Element;
