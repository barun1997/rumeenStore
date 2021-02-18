import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ImagePickerResponse } from 'react-native-image-picker';
import { HelperText } from 'react-native-paper';
import placeholder from '../../../static/placeholder.png';

interface ImageInputProps {
	handleChoosePhoto: () => void;
	photo: string | ImagePickerResponse | null;
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
				<Image
					style={imageStyle}
					source={(photo as ImagePickerResponse) ?? (placeholder as ImageSourcePropType)}
				/>
				{error && touched ? (
					<HelperText type="error">{error}</HelperText>
				) : (
					<HelperText type="info">{photo ? 'Choose an image' : 'Add Product Image'}</HelperText>
				)}
			</>
		</TouchableHighlight>
	);
};
