import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

declare global {
	//TODO: Find a better solution to this lint error
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNativePaper {
		interface ThemeColors {
			onPrimary: string;
		}
	}
}
const theme = {
	...PaperDefaultTheme,
	...NavigationDefaultTheme,
	colors: {
		...PaperDefaultTheme.colors,
		...NavigationDefaultTheme.colors,
		primary: 'teal',
		accent: 'yellow',
		surface: 'white',

		background: '#F1F1F1',
		onPrimary: 'white',
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
