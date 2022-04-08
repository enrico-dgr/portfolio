import React from "react";

const container: React.HTMLAttributes<HTMLElement>["style"] = {
	backgroundColor: "red",
	height: "80px",
	position: "fixed",
	right: 2,
	top: 2,
	transition: "all 1s ease-out",
	width: "80px",
	zIndex: 15,
};

const containerBig: React.HTMLAttributes<HTMLElement>["style"] = {
	height: 400,
	right: "calc(50% - 200px) ",
	width: 400,
};

export default {
	container,
	containerBig,
};
