import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";

const Text = () => {
	const viewport = useThree((s) => s.viewport);
	const [style, setStyle] = useState<Styles>({
		...pcStyle,
	});

	useEffect(() => {
		if (viewport.width > viewport.height) {
			setStyle({
				...style,
				aboutMe: pcStyle.aboutMe,
				aboutSite: pcStyle.aboutSite,
				aboutSiteInner: pcStyle.aboutSiteInner,
			});
		} else {
			setStyle({
				...style,
				aboutMe: mobileStyle.aboutMe,
				aboutSite: mobileStyle.aboutSite,
				aboutSiteInner: mobileStyle.aboutSiteInner,
			});
		}
	}, [viewport.width]);

	return (
		<Html fullscreen style={style.html}>
			<div style={style.aboutMe}>
				<p>
					Currently improving my skills in web development at React Academy in
					Beije. <br /> Inscribed to the Faculty of Physics in Catania, but
					passionate in web development. <br /> Before Beije Academy, I studied
					as a self-taught, learning basics of both back-end and front-end.
					<br /> Now I'm focusing on front-end.
				</p>
			</div>
			<div style={style.aboutSite}>
				<div style={style.aboutSiteInner}>
					<p>
						Main technologies of the site: <br />
						Typescript -- React (.tsx) -- react-router-dom -- @react-three/fiber
					</p>
				</div>
			</div>
		</Html>
	);
};

// styles
type StylesKeys = "aboutMe" | "aboutSite" | "aboutSiteInner" | "html";
type Styles = { [k in StylesKeys]?: React.CSSProperties };

const pcStyle: Styles = {
	aboutMe: { fontSize: 20, paddingLeft: 50, paddingTop: 30, maxWidth: 500 },
	aboutSite: {
		alignItems: "end",
		display: "flex",
		flexDirection: "column",
		fontSize: 18,
		justifyContent: "start",
		marginTop: 40,
		width: "100%",
	},
	aboutSiteInner: { maxWidth: 500, paddingRight: 40, textAlign: "right" },
	html: {
		alignItems: "start",
		color: "white",
		display: "flex",
		flexDirection: "column",
		fontWeight: "bold",
		justifyContent: "flex-start",
		lineHeight: 2,
	},
};

const mobileStyle: Styles = {
	aboutMe: { ...pcStyle.aboutMe, fontSize: 55, maxWidth: 800 },
	aboutSite: {
		...pcStyle.aboutSite,
		fontSize: 55,
	},
	aboutSiteInner: { ...pcStyle.aboutSiteInner, maxWidth: 800 },
};

export default React.memo(Text);
