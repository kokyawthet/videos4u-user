import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Dimensions } from 'react-native'
import { globalStyles,string } from '../components/globalStyle';
import Empty from '../components/Empty';
import * as Firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { InterstitialAd, BannerAd, BannerAdSize, AdEventType } from '@react-native-firebase/admob';
const interstitial = InterstitialAd.createForAdRequest(string.interAds);


export default function Episodes({ route }) {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [adloaded, setAdloaded] = useState(false);
    const { seriesId } = route.params;
    useEffect(() => {
        getCategoryPost();
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED)
            {
                setAdloaded(true)
            }
        });
        interstitial.load();
    }, [])

    const getCategoryPost = () => {
        setLoading(true)
        var tasksRef = Firebase.database().ref('/episodes/').orderByChild("seriesName").equalTo(seriesId)
        tasksRef.on('value', dataSnapshot => {
            var tasks = [];
            dataSnapshot.forEach(child => {
                tasks.push({
                    title: child.val().title,
                    videouri: child.val().videouri,
                    catId: child.val().catId,
                    created: child.val().created,
                    timestamp: child.val().timestamp,
                    key: child.key
                });
            });
            tasks.reverse();//first in last out
            setLoading(false)
            setPosts(tasks);
        });
    }
    const LittleCard = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                    navigation.navigate("EpisodesVideos", { value: item.title })
                    adloaded == true ? interstitial.show() : null;
                    setAdloaded(false);
                }} >
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.Navheader}>
                <MaterialIcons name="arrow-back" color="#fff" size={26} style={{ marginLeft: 18 }}
                    onPress={() => navigation.goBack()} />
                <Text style={{ marginLeft: 22, color: '#fff', fontSize: 18 }}>Series</Text>
            </View>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <LittleCard item={item} />
                    )
                }}
                keyExtractor={(k, v) => v.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={Empty}
                style={{ marginBottom: 3 }}
                numColumns={3}
                refreshing={loading}
                onRefresh={() => getCategoryPost()}
                style={{alignSelf:'center',flex:1}}
            />
            <View style={{alignSelf:'center'}}>
                <BannerAd unitId={string.bannerAds} size={BannerAdSize.MEDIUM_RECTANGLE} />
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
    Navheader: {
        backgroundColor: '#FF5722',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        flexDirection: 'row',
    },
    cardContainer: {
        backgroundColor: "tomato",
        width: Dimensions.get('screen').width / 3 - 20,
        height: 100,
        marginVertical: 5,
        marginHorizontal: 5,
        justifyContent: 'space-around',
        borderRadius: 50,
        elevation: 4,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#fff',
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
})
