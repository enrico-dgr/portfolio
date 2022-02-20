import helvetica from "three/examples/fonts/helvetiker_bold.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import React, { useMemo, useRef } from "react";
import { MeshProps } from "@react-three/fiber";
import { Mesh } from "three";
import { Color } from "@react-three/fiber";

type Props = { color?: Color; text: string } & MeshProps;

const Text = ({ color, text, ...props }: Props) => {
	const font = useMemo(() => new FontLoader().parse(helvetica), []);
	const ref = useRef(new Mesh());

	return (
		<>
			<mesh
				{...props}
				ref={ref}
				geometry={
					new TextGeometry(text, {
						font: font,
						size: 0.2,
						height: 0.03,
						curveSegments: 12,
					})
				}
			>
				<meshPhongMaterial color={color} />
			</mesh>
		</>
	);
};

export default Text;
