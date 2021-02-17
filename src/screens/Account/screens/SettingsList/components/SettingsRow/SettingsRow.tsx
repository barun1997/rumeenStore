import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { List, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface SettingsRowProps {
	leftIcon: IconSource;
	right?: boolean;
	title: string;
	handlePress: () => void;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
	handlePress,
	leftIcon,
	right,
	title,
}) => {
	const { colors } = useTheme();
	const styles = useStyles(colors);
	return (
		<TouchableHighlight onPress={handlePress}>
			<List.Item
				title={title}
				titleStyle={styles.listItemTitle}
				left={() => <List.Icon color={colors.textAlternate} icon={leftIcon} />}
				right={() => right && <List.Icon color={colors.textAlternate} icon="arrow-right" />}
			/>
		</TouchableHighlight>
	);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		listItemTitle: { color: colors.textAlternate },
	});
