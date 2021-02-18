import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, List, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import placeholder from '../../../../../static/placeholder.png';
import { SettingsRow } from './components/SettingsRow/SettingsRow';

function SettingsList(): JSX.Element {
	const { colors } = useTheme();
	const styles = useStyles(colors);
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Image style={styles.image} source={placeholder as ImageSourcePropType} />
				<View>
					<Subheading>Rumeen Store</Subheading>
					<Button
						compact
						labelStyle={styles.labelStyle}
						contentStyle={styles.labelStyle}
						onPress={() => console.log('pressed')}>
						<Text>Edit business details</Text>
					</Button>
				</View>
			</View>
			<Divider />
			<List.Section>
				<List.Subheader>Account Settings</List.Subheader>
				<SettingsRow
					title="Delivery charges"
					handlePress={() => navigation.navigate('DeliverySettings')}
					leftIcon="moped"
					right
				/>
				<SettingsRow
					title="Tutorials"
					handlePress={() => console.log('Tutorials')}
					leftIcon="video"
					right
				/>
				<SettingsRow title="Share" handlePress={() => console.log('Share')} leftIcon="share" />
				<SettingsRow
					title="Privacy Policy"
					handlePress={() => console.log('Privacy Policy')}
					leftIcon="lock"
				/>
				<SettingsRow
					title="Terms of Service"
					handlePress={() => console.log('Terms of Service')}
					leftIcon="file"
				/>
				<SettingsRow title="Log out" handlePress={() => console.log('Log out')} leftIcon="logout" />
			</List.Section>
		</View>
	);
}

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: { flex: 1, padding: wp('5%'), backgroundColor: 'white' },
		row: {
			flexDirection: 'row',
			height: heightPercentageToDP('10%'),
		},
		image: { height: '80%', width: '20%', marginHorizontal: wp('5%') },
		labelStyle: { padding: 0, margin: 0 },
		listItemTitle: { color: colors.textAlternate },
	});

export default SettingsList;
