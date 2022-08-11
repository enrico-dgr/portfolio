import { GUI } from 'dat.gui';
const datGui = new GUI();

const devGui = (f: (gui: GUI) => void) => {
	f(datGui);
};

export default devGui;
