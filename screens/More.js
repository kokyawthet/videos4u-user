import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList,Dimensions,TouchableOpacity ,Image} from 'react-native'
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
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false)
    const [adloaded, setAdloaded] = useState(false);
    useEffect(() => {
        getCategory();
        getSeries();
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED)
            {
                setAdloaded(true)
            }
        });
        interstitial.load();
    }, [])

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

    const getSeries = () => {
        setLoading(true)
        var tasksRef = Firebase.database().ref('/series/')
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
            setSeries(tasks);
        });
    }
    const LittleCard = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                    navigation.navigate("Videos", { catId: item.key })
                    adloaded == true ? interstitial.show() : null;
                    setAdloaded(false);
                }} >
                <Image source={{ uri: item.image }} style={{ width: '100%', height: '80%' }} />
                <View style={styles.cardText}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 12 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={globalStyles.container}>
            <Text style={styles.category}>Video Categories</Text>
            <View style={{ marginHorizontal:5,marginBottom:10 }}>
                <FlatList
                    data={cats}
                    renderItem={({ item }) => {
                        return (
                            <LittleCard item={item} />
                        )
                    }}
                    keyExtractor={(k, v) => v.toString()}
                    ListEmptyComponent={Empty}
                    style={{ marginBottom: 3 }}
                    horizontal={true}
                    refreshing={loading}
                    onRefresh={() => getCategory()}
                />
            </View>
            <View style={{alignItems:'center'}}>
                <BannerAd unitId={string.bannerAds} size={BannerAdSize.SMART_BANNER} />
            </View>

            <View style={{ flex: 1,marginTop:5 }}>
                <Text style={styles.category}>Video Series</Text>
                <FlatList
                    data={series}
                    renderItem={({ item }) => {
                        return (
                            <SeriesCard item={item} />
                        )
                    }}
                    keyExtractor={(k, v) => v.toString()}
                    ListEmptyComponent={Empty}
                    style={{ marginBottom: 3 }}
                    refreshing={loading}
                    onRefresh={() => getSeries()}
                    numColumns={2}
                    style={{alignSelf:'center',marginHorizontal:5}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: Dimensions.get('screen').width / 4,
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
})
