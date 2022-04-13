// three.js data manipulation

import { Vector2, Vector3 } from "three";

/**
 * @description Given a 1-dimension array, calculates the position in a grid ( 2-dim array ).
 *
 * Could be useful if you want to keep an array flat while doing some 2D math.
 * @param position the position in the array
 * @param maxColumns the max number of columns of the grid
 * @returns the position in a grid of columns `maxColumns`
 * @example
 * // example array
 * const flat = ['H','e','l','l','o','W','o','r','l','d'];
 *
 * // example grid of max columns: 5
 * let grid = [
 *  ['H','e','l','l','o'],
 *  ['W','o','r','l','d']
 * ];
 *
 * const positionInAGrid_4 = flatToGrid(4,5); // [4,0] 1st row
 * const positionInAGrid_8 = flatToGrid(8,5); // [2,1] 2nd row
 *
 * console.log(grid[ positionInAGrid_4.x ][ positionInAGrid_4.y ]) // 'o'
 * console.log(grid[ positionInAGrid_8.x ][ positionInAGrid_8.y ]) // 'r'
 *
 */
export const positionToGridPosition3D = (
	position: number,
	maxColumns: number
): Vector3 => {
	const y = Math.floor(position / maxColumns);

	return new Vector3(position - y * maxColumns, -y, 0);
};

/**
 * @description
 * SAME AS {@link positionToGridPosition3D}.
 *
 * Given a 1-dimension array, calculates the position in a grid ( 2-dim array ).
 *
 * Could be useful if you want to keep an array flat while doing some 2D math.
 * @param position the position in the array
 * @param maxColumns the max number of columns of the grid
 * @returns the position in a grid of columns `maxColumns`
 */
export const positionToGridPosition2D = (
	position: number,
	maxColumns: number
): Vector2 => {
	const y = Math.floor(position / maxColumns);

	return new Vector2(position - y * maxColumns, -y);
};

export default {
	positionToGridPosition3D,
};
