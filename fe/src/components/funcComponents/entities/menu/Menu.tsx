import React, { useCallback, useState } from 'react';
import { keyMap } from '../../../../constants/defaultSettings';
import events from 'events-l/events';

const Menu = () => {
	const [state, setState] = useState({
		menuOpen: true,
	});

	const open = useCallback((e: KeyboardEvent) => {
		switch (e.key) {
			case keyMap['menu']:
				setState((s) => {
					return { ...s, menuOpen: true };
				});
				break;
		}
	}, []);

	const close = useCallback(() => {
		setState((s) => {
			return { ...s, menuOpen: false };
		});
	}, []);

  /**
   * When cursor is locked, first 'Esc' is used only to exit pointer-lock.
   * Listening to pointerlockchange event ( see below ), avoids menu to remain closed
   * when unlocking pointer. 
   */
	const detectDefaultEscape = useCallback(() => {
		if (!document.pointerLockElement) {
			setState((s) => ({ ...s, menuOpen: true }));
		}
	}, []);

	React.useEffect(() => {
		document.addEventListener('keydown', open);
		document.addEventListener('pointerlockchange', detectDefaultEscape);

		return () => {
			document.removeEventListener('keydown', open);
			document.removeEventListener(
				'pointerlockchange',
				detectDefaultEscape,
			);
		};
	}, []);

	React.useEffect(() => {
		if (state.menuOpen) {
			events.dispatch({
				type: 'unlockPointer',
				data: { subscriberName: 'menu' },
			});
		} else {
			events.dispatch({
				type: 'lockPointer',
				data: { subscriberName: 'menu' },
			});
		}
	}, [state.menuOpen]);

	return (
		<div
			className="menu"
			style={{ display: state.menuOpen ? 'flex' : 'none' }}
		>
			<div className="menu__interface">
				<p className="menu-play" onClick={close}>
					Click here to play
				</p>
			</div>
		</div>
	);
};

export default Menu;
