import React, { useRef, useState } from "react";
import {
	Group,
	Mesh,
	MeshStandardMaterial,
	SphereGeometry,
	Vector2,
	Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import { positionToGridPosition3D } from "../../../utils/3dm";

// import useRefs from "../../../hooks/useRefs";

// const radius = 0.02;
// const maxColumns = 30;
const dotPos = new Vector3();
const mousePos = new Vector3();

const toNumOfSpheres = (radius: number, distance: number, size: Vector2) => {
	const unitInverse = Math.pow(radius + distance, -1);

	const x = Math.floor(size.x * unitInverse);
	const y = Math.floor(size.y * unitInverse);

	return { num: x * y, maxColumns: x };
};

type Props = {
	/**
	 * Distance between spheres
	 */
	distance: number;
	/**
	 * The radius of each sphere
	 */
	radius: number;
	/**
	 * Instead of passing a `ref` with object, pass the object directly
	 * as return.
	 */
	getSize: () => Vector2;
	refGroup?: React.MutableRefObject<Group | undefined>;
};

const Dots = ({
	radius,
	distance,
	getSize,
	refGroup: refGroup_prop,
}: Props) => {
	// the container of the dots
	const refGroup = refGroup_prop ?? useRef<Group>();
	// the array of dots, added and remove dynamically in `useFrame(()=>{})`
	const refsDots: { current: Mesh<SphereGeometry, MeshStandardMaterial> }[] =
		[];
	// the num of dots currently in use
	const refNum = useRef(0);
	// the height and width currently used for calculations:
	// - updating refNum
	// - positioning dots
	const [refSizeInUse] = useState<{ current: Vector2 }>({
		current: new Vector2(),
	});

	// frames
	useFrame(({ mouse, viewport }) => {
		const size = getSize();

		if (
			!!refGroup?.current &&
			// if size given from parent changed consistently,
			// make the math inside the `if`.
			refSizeInUse.current.distanceToSquared(size) > 0.1
		) {
			// be sure to update reference for future compares
			refSizeInUse.current = size.clone();

			// flow:
			// --
			// 1) Calculates num of elements and columns in grid
			// --
			// 2) If current num of dots is less than the calculated
			//    num in '1)', create missing dots as children of refGroup
			// --
			// 3) If current num of dots is greater than the calculated
			//    num in '1)', remove `num of dots - num in '1)'` dots
			// --
			// 4) Repositioning all the dots
			// --

			// start flow

			// 1)
			const { num, maxColumns } = toNumOfSpheres(radius, distance, size);
			const proportionalFactor = radius + distance;

			// 2)
			if (refsDots.length < num) {
				// add missing dots
				for (let i = refsDots.length; i < num; i++) {
					refsDots.push({ current: newDot(radius) });
					refGroup.current.add(refsDots[i].current);
				}
			}
			// 3)
			else if (refsDots.length > num) {
				// remove surplus dots
				for (let i = refsDots.length - 1; i >= num; i--) {
					refsDots[i].current.material.dispose();
					refsDots[i].current.geometry.dispose();
					refsDots[i].current.removeFromParent();
					refsDots.pop();
				}
			}
			// keep track of current displayed dots
			refNum.current = num;

			// 4)
			// positioning dots
			for (let i = 0; i < refsDots.length; i++) {
				refsDots[i].current.position.copy(
					positionToGridPosition3D(i, maxColumns).multiplyScalar(
						proportionalFactor
					)
				);
			}

			// refGroup.current.position.setX(size.x * 0.125);
		}

		mousePos.set(
			(mouse.x * viewport.width) / 2,
			(mouse.y * viewport.height) / 2,
			0
		);

		// dots animations
		refsDots.forEach((dot) => {
			if (!!dot.current) {
				const mouseDistance = mousePos.distanceToSquared(
					dot.current.getWorldPosition(dotPos)
				);

				// mouse near the dot
				if (mouseDistance < 2) {
					dot.current.scale.setScalar(1 + (2 - mouseDistance));
					dot.current.material.opacity = 1;
					dot.current.material.emissiveIntensity =
						(1 + (2 - mouseDistance)) * 8;
				}
				// mouse distant
				else {
					dot.current.scale.setScalar(1);
					dot.current.material.opacity = 0.2;
					dot.current.material.emissiveIntensity = 1;
				}
			}
		});
	});

	return <group position={[0, 0, 0]} ref={refGroup}></group>;
};

const newDot = (radius: number) =>
	new Mesh(
		new SphereGeometry(radius),
		new MeshStandardMaterial({
			color: "white",
			emissive: "blue",
			emissiveIntensity: 1,
			opacity: 0.2,
			transparent: true,
			roughness: 0.1,
			metalness: 0.5,
		})
	);

export default React.memo(Dots, (pre, next) => {
	if (pre.radius !== next.radius || pre.distance !== pre.distance) {
		return false;
	}
	return true;
});
