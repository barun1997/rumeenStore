import {
	DefaultTheme as NavigationDefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useMainOptions } from './app.options';
import Main from './screens/Main/main';

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
		textAlternate: 'grey',
	},
};

const Stack = createStackNavigator();

const App: React.FC<Record<string, never>> = () => {
	const mainOptions = useMainOptions();
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<Stack.Navigator>
					<Stack.Screen name="Main" component={Main} options={mainOptions} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
