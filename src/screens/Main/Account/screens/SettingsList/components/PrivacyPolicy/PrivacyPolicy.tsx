import React from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

interface PolicyModalProps {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<string>>;
	url: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
	children,
	modalVisible,
	url,
	setModalVisible,
}) => {
	const { colors } = useTheme();

	const styles = useStyles(colors);
	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible('');
				}}>
				<SafeAreaView style={{ flex: 1 }}>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible('')}>
						<Text style={styles.textStyle}>Back</Text>
					</Pressable>
					<WebView source={{ uri: url }}></WebView>
				</SafeAreaView>
			</Modal>
			{children}
		</View>
	);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		button: {
			padding: 10,
			elevation: 2,
		},
		buttonClose: {
			backgroundColor: colors.error,
		},
		textStyle: {
			color: colors.background,
			fontWeight: 'bold',
			textAlign: 'center',
		},
		modalText: {
			marginBottom: 15,
			textAlign: 'center',
		},
	});
