// data manipulation

import { Position2 } from "../types/data";

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
 * const positionInAGrid_0 = flatToGrid(0,5); // [0,0] 1st row
 * const positionInAGrid_4 = flatToGrid(4,5); // [4,0] 1st row
 * const positionInAGrid_6 = flatToGrid(6,5); // [0,1] 2nd row
 * const positionInAGrid_8 = flatToGrid(8,5); // [2,1] 2nd row
 *
 * console.log(grid[ positionInAGrid_0[0] ][ positionInAGrid_0[1] ]) // 'H'
 * console.log(grid[ positionInAGrid_4[0] ][ positionInAGrid_4[1] ]) // 'o'
 * console.log(grid[ positionInAGrid_6[0] ][ positionInAGrid_6[1] ]) // 'W'
 * console.log(grid[ positionInAGrid_8[0] ][ positionInAGrid_8[1] ]) // 'r'
 *
 */
export const positionToGridPosition = (
	position: number,
	maxColumns: number
): Position2 => {
	const y = Math.floor(position / maxColumns);

	return [position - y * maxColumns, -y];
};

export default {
	positionToGridPosition,
};
