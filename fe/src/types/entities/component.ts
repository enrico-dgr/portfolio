import { PropsWithChildren } from 'react';

export type EntityComponent<State extends {}, OtherProps extends {} = {}> = (
	props: PropsWithChildren<
		{
			inputSystems?: InputSystem<State>[];
		} & OtherProps
	>
) => JSX.Element;

export type InputSystem<State extends {}> = (entity: {
	state: State;
}) => JSX.Element;
