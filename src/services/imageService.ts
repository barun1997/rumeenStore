import firebaseStorage from '@react-native-firebase/storage';

import { ImagePickerResponse } from 'react-native-image-picker';
import ImageResponse from '../interfaces/ImageResponse';

async function uploadCoverImage(
	imageFile: ImagePickerResponse,
): Promise<ImageResponse | undefined> {
	const storageRef = firebaseStorage().ref();

	if (!imageFile?.uri) return;
	//TODO: handle for individual store instead of barun and handle unique ID
	const imagePath = `barun/${imageFile.fileName || 'image'}`;

	await storageRef.child(imagePath).putFile(imageFile.uri);

	const snapshotRef = firebaseStorage().ref(imagePath);

	const downloadUrl = await snapshotRef.getDownloadURL();

	console.log(downloadUrl);
	return {
		imagePath,
		downloadUrl,
	};
}

export { uploadCoverImage };
