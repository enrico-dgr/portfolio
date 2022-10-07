import React, { useState } from 'react';
import { keyMap } from '../../../../constants/defaultSettings';

const Menu = () => {
	const [state, setState] = useState({
		menuOpen: false,
	});

	React.useEffect(() => {
		const openClose = (e: KeyboardEvent): void => {
			switch (e.key) {
				case keyMap['menu']:
					setState({ menuOpen: !state.menuOpen });
					break;
			}
		};

		document.addEventListener('keydown', openClose);

		return () => {
			document.removeEventListener('keydown', openClose);
		};
	}, []);

	return (
		<div
			className="menu"
			style={{ display: state.menuOpen ? 'block' : 'none' }}
		>
			Menu
		</div>
	);
};

export default Menu;
