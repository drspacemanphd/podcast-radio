import { Audio  } from 'expo-av';

export default createAudioPlayback = async () => {

    await Audio.setAudioModeAsync(
        {
            staysActiveInBackground: true,
            playsInSilentModeIOS: false,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false
        }
    );

    return new Audio.Sound();

}