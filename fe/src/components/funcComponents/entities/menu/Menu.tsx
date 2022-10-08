import React, { useCallback, useState } from 'react';
import { keyMap } from '../../../../constants/defaultSettings';
import events from '../../../../events/events';

const Menu = () => {
	const [state, setState] = useState({
		menuOpen: false,
	});

	const openClose = useCallback((e: KeyboardEvent): void => {
		switch (e.key) {
			case keyMap['menu']:
				setState((s) => {
					return { ...s, menuOpen: true };
				});
				break;
		}
	}, []);

	React.useEffect(() => {
		document.addEventListener('keydown', openClose);

		return () => {
			document.removeEventListener('keydown', openClose);
		};
	}, []);

	React.useEffect(() => {
		if (state.menuOpen) {
			events.dispatch({
				type: 'requestPointerUnlock',
				data: { subscriberName: 'menu' },
			});
		} else {
			events.dispatch({
				type: 'requestPointerLock',
				data: { subscriberName: 'menu' },
			});
		}
	}, [state.menuOpen]);

	return (
		<div
			className="menu"
			style={{ display: state.menuOpen ? 'flex' : 'none' }}
		>
			<div className='menu__interface'>
        <p className='menu-play'>Click here to play</p>
      </div>
		</div>
	);
};

export default Menu;
