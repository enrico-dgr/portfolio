import { CSSProperties } from 'react';

const style: Record<
	| 'dropdown'
	| 'section'
	| 'triangleDown'
	| 'triangleUp'
	| 'sectionList'
	| 'sectionLeft'
	| 'sectionRight'
	| 'item',
	CSSProperties
> = {
	dropdown: {
		color: 'white',
		zIndex: 1,
	},
	section: {},
	triangleDown: {
		display: 'inline-block',
		borderTop: '8px solid white',
		borderRight: '4px solid transparent',
		borderLeft: '4px solid transparent',
		marginRight: '5px',
		width: '1px',
	},
	triangleUp: {
		display: 'inline-block',
		borderBottom: '8px solid white',
		borderRight: '4px solid transparent',
		borderLeft: '4px solid transparent',
		marginRight: '5px',
		width: '1px',
	},
	sectionList: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	sectionLeft: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		margin: '0 9px 0 4px',
		width: 1,
	},
	sectionRight: {},
	item: {},
};

export default style;
