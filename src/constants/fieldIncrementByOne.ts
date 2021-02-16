import { firebase } from '@react-native-firebase/firestore';

const fieldIncrementByOne = firebase.firestore.FieldValue.increment(1);

export { fieldIncrementByOne };
