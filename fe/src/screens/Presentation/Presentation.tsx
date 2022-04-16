import React from "react";

import Html from "./Html";
import Background from "./Background";
import CursorAnimation from "./CursorAnimation";
import Text from "../../components/funcComponents/text/Text";

const Presentation = () => {
	return (
		<group>
			<ambientLight intensity={0.1} />
			<directionalLight color="red" position={[0, 0, 5]} />
			<Html />
			<Text>Ciao</Text>
			<Background />
			<CursorAnimation />
		</group>
	);
};

export default React.memo(Presentation);
