import React, { Component } from "react";

import { Html as DreiHtml } from "@react-three/drei";
import Span from "../../components/classComponents/Span/Span";

class Html extends Component {
	splitText = (text: string) => {
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
	render() {
		return (
			<DreiHtml fullscreen style={htmlContainer}>
				<div style={greetsContainer}>
					<Span
						style={textContainer}
						selectors={[
							{
								selector: "hover",
								style: textContainerHover,
							},
						]}
					>
						{this.splitText("Hello there!")}
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
						{this.splitText("I am...")}
					</Span>
				</div>
				<div style={nameContainer}>
					<Span
						style={textContainer}
						selectors={[
							{
								selector: "hover",
								style: textContainerHover,
							},
						]}
					>
						{this.splitText("Enrico Di Grazia")}
					</Span>
				</div>
			</DreiHtml>
		);
	}
}

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
const greetsContainer: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	fontSize: 45,
	paddingLeft: 55,
	paddingTop: 40,
};
const nameContainer: React.CSSProperties = {
	alignItems: "center",
	display: "flex",
	height: "50vh",
	fontSize: 80,
	minHeight: "min-content",
	justifyContent: "center",
	width: "100%",
};

export default Html;
