import {Platform} from 'react-native';

export const checkIsIOS = () => Platform.OS === 'ios' || false;
