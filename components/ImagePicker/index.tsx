import { FC, useCallback, useState } from 'react';
import { Alert, View, ViewStyle, StyleProp, Image, Text } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, ImageInfo } from 'expo-image-picker';
import { styles } from './styles';
import { OutlinedButton } from '../buttons/OutlinedButton';

interface IProps {
  onImagePicked(image: string): void;
  style?: StyleProp<ViewStyle>;
}

export const ImagePicker: FC<IProps> = ({ onImagePicked, style }) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState('');

  const verifyPermission = useCallback(async () => {
    if (cameraPermissionInfo.status === PermissionStatus.GRANTED ) return true;
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert('Permission needed', 'You need to grant camera permissions to use this app');
      return false;
    }

    const { status } = await requestPermission();

    return status === PermissionStatus.GRANTED;
  }, [cameraPermissionInfo, requestPermission]);

  const onTakePicturePress = useCallback(async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    const pic = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    }) as ImageInfo;

    setPicture(pic.uri);
    onImagePicked(pic.uri);
  }, [verifyPermission]);

  return (
    <View style={ [styles.container, style] }>
      <View style={ styles.imageContainer }>
        {
          picture
            ? <Image source={ { uri: picture } } style={ styles.image } />
            : <Text>No Image Found</Text>
        }
      </View>
      <OutlinedButton
        icon='camera'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPress={ onTakePicturePress }
      >
        Take Picture
      </OutlinedButton>
    </View>
  );
};
