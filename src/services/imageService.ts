import firebaseStorage from '@react-native-firebase/storage';
import { ImagePickerResponse } from 'react-native-image-picker';
import ImageResponse from '../interfaces/ImageResponse';
import { StoreContext } from '../interfaces/StoreSetting';

async function uploadCoverImage(
	{ storeName }: StoreContext,
	imageFile: ImagePickerResponse,
): Promise<ImageResponse | undefined> {
	try {
		const storageRef = firebaseStorage().ref();

		if (!imageFile?.uri) return;
		if (!storeName) return;

		//TODO:  handle unique ID
		const imagePath = `${storeName}/${imageFile.fileName || 'image'}`;

		await storageRef.child(imagePath).putFile(imageFile.uri);

		const snapshotRef = firebaseStorage().ref(imagePath);

		const downloadUrl = await snapshotRef.getDownloadURL();

		console.log(downloadUrl);
		return {
			imagePath,
			downloadUrl,
		};
	} catch (error) {
		console.log(error);
	}
}

export { uploadCoverImage };
