import { ThreeDataPrimitive } from './entities';

export type System<
	ThreeData extends ThreeDataPrimitive,
	State extends {}
> = (entity: { threeData: ThreeData; state: State }) => (delta: number) => void;
