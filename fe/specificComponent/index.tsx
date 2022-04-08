import React from "react";
import * as ReactDOM from "react-dom";

// drei stats
import { Stats } from "@react-three/drei";

// component
import NavSphere from "../src/components/classComponents/navSphere/NavSphere";

// style
import "./style.scss";

let domContainer = document.getElementById("react");
if (domContainer === null) throw new Error("dom container is null.");

ReactDOM.render(
	<div>
		<Stats showPanel={0} />
		<NavSphere />
	</div>,
	domContainer
);
