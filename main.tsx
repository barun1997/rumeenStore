import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const theme = {
	...PaperDefaultTheme,
	...NavigationDefaultTheme,
	colors: {
		...PaperDefaultTheme.colors,
		...NavigationDefaultTheme.colors,
		primary: 'tomato',
		accent: 'yellow',
	},
};

const Main: React.FC<Record<string, never>> = () => {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<App />
			</NavigationContainer>
		</PaperProvider>
	);
};

export default Main;
