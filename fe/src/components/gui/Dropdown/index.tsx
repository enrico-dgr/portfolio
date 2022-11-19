import React, { CSSProperties, PropsWithChildren } from 'react';
import style from './style';

type Section = {
	title: string;
	elements: JSX.Element[];
};

type Props = {
	sections: Section[];
	style?: CSSProperties;
	uniqueTitle: string;
};

const Dropdown = (props: Props) => {
	return (
		<div style={{ ...style.dropdown, ...props.style }}>
			{props.sections.map((s) => (
				<SectionComp
					key={props.uniqueTitle + s.title}
					section={s}
					uniqueTitle={props.uniqueTitle}
				/>
			))}
		</div>
	);
};

const SectionComp = (props: { section: Section; uniqueTitle: string }) => (
	<div style={style.section}>
		<div>
			<div style={style.triangleDown}></div>
			{props.section.title}
		</div>
		<div style={style.sectionList}>
			<div style={style.sectionLeft}></div>
			<div style={style.sectionRight}>
				{props.section.elements.map((e, i) => (
					<Item key={props.uniqueTitle + props.section.title + i}>
						{e}
					</Item>
				))}
			</div>
		</div>
	</div>
);

const Item = (props: PropsWithChildren) => (
	<div style={style.item}>{props.children}</div>
);

export default Dropdown;
