import React from "react";
import { Link as RRDLink, LinkProps, To } from "react-router-dom";
import { scroll } from "../classComponents/SinglePageRouting";

const Link = (props: LinkProps) => {
	const [state, setState] = React.useState({
		hover: false,
	});

	const setHoverTrue = () => setState({ ...state, hover: true });
	const setHoverFalse = () => setState({ ...state, hover: false });

	const navigateTo = (to: To) => () => scroll(typeof to === "string" ? to : "");
	return (
		<RRDLink
			{...props}
			onClick={navigateTo(props.to)}
			style={{ ...styleLink, ...(state.hover ? styleLinkHover : {}) }}
			onMouseEnter={setHoverTrue}
			onMouseLeave={setHoverFalse}
		/>
	);
};

const styleLink: React.CSSProperties = {
	color: "white",
	fontSize: 18,
	textDecoration: "none",
	transition: "all ease 0.2s",
};

const styleLinkHover: React.CSSProperties = {
	textShadow: "0 0 10px rgba(40,0,255,0.2)",
	color: "rgb(200,200,255)",
	fontSize: 21,
};

export default Link;
