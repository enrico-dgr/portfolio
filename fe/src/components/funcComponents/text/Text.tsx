import React, { useEffect, useMemo, useRef } from "react";

// 3js
import { Mesh } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import f from "../../../assets/3js/fonts/helvetiker_regular.typeface.json";

// dat.gui
import dat from "dat.gui";

const gui = new dat.GUI();
const position = { x: 0, y: 0, z: 0 };
const specs = {
	size: 100,
	height: 1,
	curveSegments: 7,
	bevelThickness: 7,
	bevelSize: 4,
	bevelOffset: 0,
	bevelSegments: 5,
};

type Props = {
	children: string;
};

const Text = (props: Props) => {
	const ref = useRef<Mesh<TextGeometry>>(null);
	const font = useMemo(() => new FontLoader().parse(f), []);
	const updateGeometry = () => {
		if (!ref.current) return;
		ref.current.position.set(position.x, position.y, position.z);
		ref.current.geometry.dispose();
		ref.current.geometry = new TextGeometry(props.children, {
			font,
			bevelEnabled: true,
			...specs,
		});
	};

	useEffect(() => {
		gui.add(position, "x", -500, 500).onChange(updateGeometry);
		gui.add(position, "y", -500, 500).onChange(updateGeometry);
		gui.add(position, "z", -500, 500).onChange(updateGeometry);
		gui.add(specs, "size", 1, 500).onChange(updateGeometry);
		gui.add(specs, "height", 0, 250).onChange(updateGeometry);
		gui.add(specs, "curveSegments", 0, 100).onChange(updateGeometry);
		gui.add(specs, "bevelThickness", 0, 100).onChange(updateGeometry);
		gui.add(specs, "bevelSize", 0, 100).onChange(updateGeometry);
		gui.add(specs, "bevelOffset", 0, 100).onChange(updateGeometry);
		gui.add(specs, "bevelSegments", 0, 100).onChange(updateGeometry);
	}, []);

	useEffect(() => {
		updateGeometry();
	}, [ref.current]);

	return <mesh ref={ref} scale={0.007} />;
};

export default React.memo(Text);
