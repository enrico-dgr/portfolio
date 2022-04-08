import React, { useCallback, useState } from "react";

// three
import { Canvas } from "@react-three/fiber";
import style from "./style";
import { MeshStandardMaterial, SphereGeometry } from "three";

type State = {
	open: boolean;
};

const NavSphere = () => {
	const [state, setState] = useState<State>({
		open: false,
	});

	const open = useCallback(
		() =>
			setState((prev) => {
				// if (!prev.open) {
				// 	return { ...prev, open: true };
				// }
				// console.log(prev.open);
				// return prev;
				return { ...prev, open: !prev.open };
			}),
		[]
	);

	return (
		<Canvas
			style={{ ...style.container, ...(state.open && style.containerBig) }}
			camera={{ position: [0, 0, 3] }}
			gl={{
				powerPreference: "high-performance",
			}}
		>
			<ambientLight intensity={0.1} />
			<directionalLight color="white" position={[5, 5, 5]} />
			<mesh
				onClick={open}
				geometry={new SphereGeometry(1.5)}
				material={
					new MeshStandardMaterial({
						color: "white",
						emissive: "blue",
						emissiveIntensity: 1,
						opacity: 0.5,
						transparent: true,
						roughness: 0.4,
						metalness: 0.8,
					})
				}
			/>
		</Canvas>
	);
};

export default React.memo(NavSphere);
