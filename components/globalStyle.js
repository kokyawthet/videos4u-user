import { StyleSheet, Dimensions } from 'react-native'
import { BannerAd, TestIds, BannerAdSize, RewardedAd } from '@react-native-firebase/admob'
const adUnitId = TestIds.BANNER
const adInter = TestIds.INTERSTITIAL;
export const string = {
    'bannerAds': "ca-app-pub-7962095645683737/6975808019",
    'interAds': "ca-app-pub-7962095645683737/4349644676",
}
// Video Fou you app id => ca-app-pub-7962095645683737~3561169006

//banner id => ca-app-pub-7962095645683737/6975808019

//inter id => ca-app-pub-7962095645683737/4349644676




export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
    },
    imageOverlay: {
        width: Dimensions.get('screen').width / 2 - 30,
        height: 160,
        borderRadius: 5,
        backgroundColor: '#000',
        position: 'absolute',
        opacity: 0.2
    },
    imageText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    image: {
        width: Dimensions.get('screen').width / 2 - 30,
        height: 160,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: '#ccc',
    },
    favourite: {
        position: 'absolute',
        right: 20,
        top: 15,
        borderRadius: 40,
        padding: 10,
    },
    cardContainer: {
        backgroundColor: "#222",
        width: "90%",
        height: 50,
        marginTop: 15,
        marginHorizontal: 5,
        borderRadius: 6,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardText: {
        color: '#fff',
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 10
    },

});
