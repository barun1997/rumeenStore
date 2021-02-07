import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: 'tomato',
		accent: 'yellow',
	},
};

const Main: React.FC<Record<string, never>> = () => {
	return (
		<PaperProvider theme={theme}>
			<App />
		</PaperProvider>
	);
};

export default Main;
