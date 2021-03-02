import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ImageStyle as FastImageStyle } from 'react-native-fast-image';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { HelperText } from 'react-native-paper';
import placeholder from '../../../static/placeholder.png';

interface ImageInputProps {
	handleChoosePhoto: () => void;
	photo: string;
	error?: string;
	touched?: boolean;
	imageContainerStyle?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
}

export const ImageInput: React.FC<ImageInputProps> = ({
	handleChoosePhoto,
	photo,
	error,
	touched,
	imageContainerStyle,
	imageStyle,
}) => {
	return (
		<TouchableHighlight style={imageContainerStyle} onPress={handleChoosePhoto}>
			<>
				{photo ? (
					<FastImage
						style={imageStyle as StyleProp<FastImageStyle>}
						source={{
							uri: photo,
						}}
					/>
				) : (
					<Image style={imageStyle} source={placeholder as ImageSourcePropType} />
				)}
				{error && touched ? (
					<HelperText type="error">{error}</HelperText>
				) : (
					<HelperText type="info">{photo ? 'Choose an image' : 'Add Product Image'}</HelperText>
				)}
			</>
		</TouchableHighlight>
	);
};
