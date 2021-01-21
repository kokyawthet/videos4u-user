import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList,Dimensions,TouchableOpacity ,Image,Linking,Share,ScrollView} from 'react-native'
import Empty from '../components/Empty';
import { InterstitialAd, BannerAd, BannerAdSize,AdEventType } from '@react-native-firebase/admob';
import * as Firebase from 'firebase';
import SeriesCard from '../components/SeriesCard';
import { globalStyles, string } from '../components/globalStyle';
import { useNavigation } from '@react-navigation/native';
const interstitial = InterstitialAd.createForAdRequest(string.interAds);


export default function Home() {
    const navigation = useNavigation();
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false)
    const [adloaded, setAdloaded] = useState(false);
    useEffect(() => {
        getCategory();
        adLoader();
    }, [])

    const adLoader = () => {
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED)
            {
                setAdloaded(true)
            }
        });
        interstitial.load();
    }

    const adShower = () => {
        interstitial.show()
        setAdloaded(false);
    }

    const getCategory = () => {
        setLoading(true)
        var tasksRef = Firebase.database().ref('/category/')
        tasksRef.on('value', dataSnapshot => {
            var tasks = [];
            dataSnapshot.forEach(child => {
                tasks.push({
                    title: child.val().title,
                    image: child.val().image,
                    created: child.val().created,
                    timestamp: child.val().timestamp,
                    key: child.key
                });
            });
            tasks.reverse();//first in last out
            setLoading(false)
            setCats(tasks);
        });
    }

    const LittleCard = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                    navigation.navigate("Videos", { catId: item.key })
                    adloaded == true ? adShower() : adLoader();
                }} >
                <Image source={{ uri: item.image }} style={{ width: '100%', height: '80%' }} />
                <View style={styles.cardText}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 14 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading == true)
    {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../image/app.gif')}
                    style={styles.image}
                />
            </View>
        )
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={cats}
                renderItem={({ item }) => {
                    return (
                        <LittleCard item={item} />
                    )
                }}
                keyExtractor={(k, v) => v.toString()}
                ListEmptyComponent={Empty}
                refreshing={loading}
                numColumns={2}
                style={{alignSelf:'center'}}
                onRefresh={() => getCategory()}
            />
            <BannerAd unitId={string.bannerAds} size={BannerAdSize.SMART_BANNER} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignContent: 'center',
        justifyContent: 'center'
    },
    category: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 3,
        marginLeft: 8,
        marginVertical:3
    },
    cardContainer: {
        backgroundColor: "#29434e",
        width: Dimensions.get('screen').width / 2-10,
        height: 130,
        marginVertical: 5,
        marginHorizontal: 5,
        justifyContent: 'space-around',
        borderRadius: 6,
        elevation: 4,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#fff',
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    cardText: {
        alignContent: "center",
        backgroundColor: '#222',
        width: '100%',
        paddingVertical: 3,
        height: '20%',
    },
    image: {
        alignSelf: 'center',
        width: "80%",
        height: "30%",
    },
})
