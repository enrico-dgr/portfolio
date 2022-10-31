import { Entity } from './entities/component';

export type System<EObjects extends {}, EState extends {}> = (
	entity: Exclude<Entity<EObjects, EState>, undefined>
) => JSX.Element;

export type SystemSubState<T extends any> = { cur: T; prev: T };
