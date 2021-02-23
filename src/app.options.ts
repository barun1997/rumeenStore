import { StackNavigationOptions } from '@react-navigation/stack';

export const useGuestOptions = (): StackNavigationOptions => ({
	title: 'Dailo - Service for your needs',
	headerShown: false,
});

export const useMainOptions = (): StackNavigationOptions => ({
	headerShown: false,
});
