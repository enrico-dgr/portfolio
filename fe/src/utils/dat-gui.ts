import { GUI } from 'dat.gui';
const datGui = new GUI();

const env = process.env.NODE_ENV;

const develop = (f: (gui: GUI) => void) => {
	if (env === 'development') {
		const devGui =
			datGui.__folders['develop'] ?? datGui.addFolder('develop');

		f(devGui);
	}
};

const staging = (f: (gui: GUI) => void) => {
	if (env === 'staging') {
		const prodGui = datGui.__folders['staging'] ?? datGui.addFolder('staging');
		f(prodGui);
	}
};

const prod = (f: (gui: GUI) => void) => {
	if (env === 'production') {
		f(datGui);
	}
};

export default { develop, staging, prod };
