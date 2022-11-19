import React, { useState } from "react";

import { Html as DreiHtml } from "@react-three/drei";
import Span from "../../components/gui/Span/Span";
import { useThree } from "@react-three/fiber";

type Size = "portrait" | "medium" | "big";

const Html = () => {
	const [state, setState] = useState<{ size: Size }>({
		size: "big",
	});

	const viewport = useThree((s) => s.viewport);

	const ratio = viewport.width / viewport.height;
	if (ratio > 1) {
		if (state.size !== "big") {
			setState({ ...state, size: "big" });
		}
	} else if (ratio > 0.7 && ratio < 1) {
		if (state.size !== "medium") {
			setState({ ...state, size: "medium" });
		}
	} else {
		if (state.size !== "portrait") {
			setState({ ...state, size: "portrait" });
		}
	}

	return (
		<DreiHtml fullscreen style={htmlContainer}>
			<div style={getGreetsContainer(state.size)}>
				<Span
					style={textContainer}
					selectors={[
						{
							selector: "hover",
							style: textContainerHover,
						},
					]}
				>
					{splitText("Hello there!")}
				</Span>
				<Span
					style={textContainer}
					selectors={[
						{
							selector: "hover",
							style: textContainerHover,
						},
					]}
				>
					{splitText("I am...")}
				</Span>
			</div>
			<div style={getNameContainer(state.size)}>
				<Span
					style={textContainer}
					selectors={[
						{
							selector: "hover",
							style: textContainerHover,
						},
					]}
				>
					{splitText("Enrico Di Grazia")}
				</Span>
			</div>
		</DreiHtml>
	);
};

const splitText = (text: string) => {
	return text.split("").map((c, i) => (
		<Span
			selectors={[
				{
					selector: "hover",
					style: letterHover,
				},
			]}
			style={letter}
			key={text + c + i}
		>
			{c}
		</Span>
	));
};

const htmlContainer: React.CSSProperties = {
	color: "white",
	display: "flex",
	fontFamily: "Helvetica, Arial, sans-serif",
	flexDirection: "column",
};
const letter: React.CSSProperties = {
	transition: "all ease 0.2s",
};
const letterHover: React.CSSProperties = {
	color: "Highlight",
	textShadow: "1px 1px 30px blue, 1px 1px 30px lightblue",
};
const textContainer: React.CSSProperties = {
	fontWeight: "bold",
	padding: 8,
	transition: "all ease 0.1s",
	userSelect: "none",
	width: "fit-content",
};
const textContainerHover: React.CSSProperties = {
	textShadow: "1px 1px 20px white",
};

const getGreetsContainer = (size: Size) => {
	switch (size) {
		case "big":
			return greetsContainerBig;
		case "medium":
			return greetsContainerMedium;
		case "portrait":
			return greetsContainerPortrait;

		default:
			return nameContainerBig;
	}
};

const greetsContainerBig: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	fontSize: 45,
	paddingLeft: 55,
	paddingTop: 40,
};
const greetsContainerMedium: React.CSSProperties = {
	...greetsContainerBig,
	fontSize: 40,
};
const greetsContainerPortrait: React.CSSProperties = {
	...greetsContainerBig,
	fontSize: 65,
};

const getNameContainer = (size: Size) => {
	switch (size) {
		case "big":
			return nameContainerBig;
		case "medium":
			return nameContainerMedium;
		case "portrait":
			return nameContainerPortrait;

		default:
			return nameContainerBig;
	}
};

const nameContainerBig: React.CSSProperties = {
	alignItems: "center",
	display: "flex",
	height: "50vh",
	fontSize: 80,
	minHeight: "min-content",
	justifyContent: "center",
	width: "100%",
};
const nameContainerMedium: React.CSSProperties = {
	...nameContainerBig,
	fontSize: 60,
};

const nameContainerPortrait: React.CSSProperties = {
	...nameContainerBig,
	fontSize: 110,
};

export default Html;
