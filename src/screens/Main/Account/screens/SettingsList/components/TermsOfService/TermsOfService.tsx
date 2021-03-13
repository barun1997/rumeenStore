import React from 'react';
import WebView from 'react-native-webview';

export const TermsOfService: React.FC<Record<string, never>> = () => {
	return <WebView source={{ uri: 'https://www.paana.news/terms-of-service' }} />;
};
