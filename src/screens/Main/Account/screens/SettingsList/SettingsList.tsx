import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, List, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import placeholder from '../../../../../../static/placeholder.png';
import { DELIVERY_SETTINGS_ROUTE, EDIT_STORE_DETAILS_ROUTE } from '../../../../../constants/routes';
import { PolicyModal } from './components/PrivacyPolicy/PrivacyPolicy';
import { SettingsRow } from './components/SettingsRow/SettingsRow';

const PRIVACY_POLICY = 'PrivacyPolicy';

const TERMS_OF_SERVICE = 'TermsOfService';

function SettingsList(): JSX.Element {
	const [modalVisible, setModalVisible] = React.useState('');
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
						onPress={() => navigation.navigate(EDIT_STORE_DETAILS_ROUTE)}>
						<Text>Edit business details</Text>
					</Button>
				</View>
			</View>
			<Divider />
			<List.Section>
				<List.Subheader>Account Settings</List.Subheader>

				<SettingsRow
					title="Delivery charges"
					handlePress={() => navigation.navigate(DELIVERY_SETTINGS_ROUTE)}
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

				<PolicyModal
					modalVisible={modalVisible === PRIVACY_POLICY}
					setModalVisible={setModalVisible}
					url="https://www.paana.news/privacy-policy">
					<SettingsRow
						title="Privacy Policy"
						handlePress={() => setModalVisible(PRIVACY_POLICY)}
						leftIcon="lock"
					/>
				</PolicyModal>

				<PolicyModal
					modalVisible={modalVisible === TERMS_OF_SERVICE}
					setModalVisible={setModalVisible}
					url="https://www.paana.news/terms-of-service">
					<SettingsRow
						title="Terms of Service"
						handlePress={() => setModalVisible(TERMS_OF_SERVICE)}
						leftIcon="file"
					/>
				</PolicyModal>

				<SettingsRow title="Log out" handlePress={() => auth().signOut()} leftIcon="logout" />
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
