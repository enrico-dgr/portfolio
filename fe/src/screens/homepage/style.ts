import React from "react";

const container: React.HTMLAttributes<HTMLDivElement>["style"] = {
	height: "100vh",
	left: 0,
	position: "fixed",
	top: 0,
	width: "100vw",
};

const header: React.HTMLAttributes<HTMLHeadingElement>["style"] = {
	alignItems: "center",
	backgroundColor: "rgba(37, 0, 63,0.95)",
	boxShadow: "1px 1px 18px rgba(37, 0, 63,0.95)",
	display: "flex",
	height: 45,
	justifyContent: "space-around",
	left: 0,
	position: "fixed",
	top: 0,
	width: "100vw",
};

export default {
	container,
	header,
};
