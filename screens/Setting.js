import React from 'react';
import { Text, View, Linking, TouchableOpacity, Share, Alert } from 'react-native';
import { globalStyles } from '../components/globalStyle';
import Feather from 'react-native-vector-icons/Feather';

const GOOGLE_PACKAGE_NAME = 'com.videosforu';
const APPLE_STORE_ID = 'id284882215';
const openStore = () => {
    if (Platform.OS != 'ios')
    {
        Linking.openURL(`https://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`)
            .catch(err =>
                alert('Please check for the Google Play Store')
            );
    }
};
const shareAppOptions = () => {
    Share.share({
        title: "Hello Friends",
        message: `https://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`,
        dialogTitle: "Please Install"
    })
}


export default class Other extends React.Component {
    state = {
        post: [],
        loading: false
    }
    render() {
        return (
            <View style={globalStyles.container}>
                <View style={{alignItems:'center',}}>
                    <TouchableOpacity
                        onPress={() => openStore()}
                        style={globalStyles.cardContainer}>
                        <Text style={globalStyles.cardText}>Rate us</Text>
                        <View style={{
                            alignSelf: 'center',
                            marginRight: 8
                        }}>
                            <Feather name="arrow-right" size={22} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => shareAppOptions()}
                        style={globalStyles.cardContainer}>
                        <Text style={globalStyles.cardText}>Share app</Text>
                        <View style={{
                            alignSelf: 'center',
                            marginRight: 8
                        }}>
                            <Feather name="arrow-right" size={22} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('fb://page/110340104196919')}
                        style={globalStyles.cardContainer}>
                        <Text style={globalStyles.cardText}>Contact us</Text>
                        <View style={{
                            alignSelf: 'center',
                            marginRight: 8
                        }}>
                            <Feather name="arrow-right" size={22} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}