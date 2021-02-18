import {
	DefaultTheme as NavigationDefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import {
	Colors,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import App from './App';
import { StoreSettingsProvider } from './providers/StoreSettingsProvider';

declare global {
	//TODO: Find a better solution to this lint error
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNativePaper {
		interface ThemeColors {
			onPrimary: string;
			textAlternate: string;
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
		onSurface: '#fcfafa',
		background: '#F1F1F1',
		onPrimary: 'white',
		textAlternate: Colors.grey700,
	},
};

const Main: React.FC<Record<string, never>> = () => {
	return (
		<StoreSettingsProvider>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
					<App />
				</NavigationContainer>
			</PaperProvider>
		</StoreSettingsProvider>
	);
};

export default Main;
