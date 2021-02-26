import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as loadingAnimation from '../../../static/loading.json';

function Loading(): JSX.Element {
	return (
		<View style={styles.container}>
			<LottieView style={styles.animation} source={loadingAnimation} autoPlay loop />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	animation: { height: heightPercentageToDP('20%') },
});

export default Loading;
