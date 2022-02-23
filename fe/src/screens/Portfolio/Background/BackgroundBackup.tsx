import React, { useRef } from "react";

import { Box3, Mesh, Vector2, Vector3 } from "three";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";

import Dots from "./Dots";
// import Cube from "./Cube";

type Props = GroupProps & {
	position?: Vector3;
};

const Background = ({ position = new Vector3(0, 0, 0), ...props }: Props) => {
	const ref = useRef<Mesh>(null);
	const sceneBox = useRef<Box3>(new Box3());
	const sceneSizeLast = useRef<Vector3>(new Vector3());
	const sceneSize = useRef<Vector3>(new Vector3());
	const dotsSize = useRef<Vector2>(new Vector2());
	const { invalidate } = useThree();

	useFrame(({ scene }) => {
		sceneBox.current.setFromObject(scene);
		sceneSize.current.copy(sceneBox.current.max).sub(sceneBox.current.min);

		if (
			!!ref.current &&
			// precision of re-computing
			sceneSizeLast.current.distanceToSquared(sceneSize.current) > 0.01
		) {
			// center background
			ref.current.position.set(
				scene.position.x - sceneSize.current.x * 0.5,
				scene.position.y + sceneSize.current.y * 0.5,
				position.z
			);
			// restore data
			sceneSizeLast.current.copy(sceneSize.current);
			dotsSize.current.set(sceneSize.current.x, sceneSize.current.y);
			invalidate();
		}
	});

	// useEffect(() => {
	// 	console.log("lofol");

	// 	const vec = three.scene.position
	// 		.max(new Vector3())
	// 		.sub(three.scene.position.min(new Vector3()));

	// 	setSize(new Vector2().fromArray([...vec.toArray()]));
	// }, [three.scene.position.max(v3).x]);
	// const getDotsSize = useCallback(()=> {
	//         return dotsSize.current.
	// })

	return (
		<group position={position} {...props} ref={ref}>
			{/* Cube */}
			{/* <Cube  /> */}
			{/* Dots Grid */}
			<Dots dotsRadius={0.02} size={dotsSize.current} />
		</group>
	);
};

export default Background;
