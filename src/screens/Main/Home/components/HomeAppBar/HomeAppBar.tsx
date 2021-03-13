import { StackHeaderProps } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Subheading, Text, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const HomeAppBar: React.FC<StackHeaderProps> = ({ scene }) => {
	const { options } = scene.descriptor;
	const { colors } = useTheme();
	const styles = useStyles(colors);
	return (
		<Appbar.Header style={styles.header} dark statusBarHeight={options.headerStatusBarHeight}>
			<Card style={styles.card}>
				<Subheading style={styles.shareText}>Share link on instagram</Subheading>
				<Text style={styles.descriptionText}>
					Your customers can visit your online store and place orders from the following link
				</Text>
				<View style={styles.actionLink}>
					<Text style={{ color: colors.primary }}>dailo.dukan/dailo198</Text>
					<Button mode="contained">Share</Button>
				</View>
			</Card>
		</Appbar.Header>
	);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		header: {
			flexDirection: 'column',
			justifyContent: 'center',
		},
		card: {
			width: '90%',
			paddingHorizontal: '5%',
			paddingVertical: '2%',
			position: 'absolute',
			height: heightPercentageToDP('15%'),
		},
		shareText: { color: colors.primary },
		descriptionText: { color: colors.backdrop },
		actionLink: {
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
	});
export default HomeAppBar;
