import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity,TextInput,Keyboard } from 'react-native';
import { globalStyles,string } from '../components/globalStyle';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchCard from '../components/SearchCard';
import { InterstitialAd, BannerAd, BannerAdSize, AdEventType } from '@react-native-firebase/admob';


export default function Search({route}) {
    const[value, setValue] = useState("");
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [miniCardData, setMiniCardData] = useState([]);
    // const { title } = route.params;
    useEffect(() => {
        // setValue(title)
    },[]);
    // 1. videos for u | 2. twod boss | 3. videos 4u(4)/ 4. videos fouru (3)
    var keys = [
        'AIzaSyCZB4erfRE0ALVT6fVBaTDg1btfcNhdpjs',
        'AIzaSyAZzCzPWiGv5tFaOg8Pr4cZIFE1u3nllPk',
        'AIzaSyDLlVKlgaPfGOjzyJNBgxU34XxN5P5F2po',
        'AIzaSyDH5G9k8Cb7TGbRPB3lXCXuHlvKhdT7D-I',
        'AIzaSyDA1GU_zCDNEKseeHZw7uK-hc-WGVaqOls',
        'AIzaSyDFv-t2RXdye6S1E6b2GtzaUEHHrmUbGbI',
        'AIzaSyCyPgSaoVl_osIzflZWNqsa48kzS5qwA8k',
        'AIzaSyDfIba4-8D92Dzc9gtlO8es0Yyj0euz1IQ',
        'AIzaSyAtTfNULhGLh3OayNhAmjRC-kN5pWFvyBk',
        'AIzaSyB04ODp24MONLycfzxyHklZ86x_wP6EBAY',
        'AIzaSyApJF0czlWfkx6NL6ZYxtLTtHospzym4qE',
        'AIzaSyB1El3iu6aPpgl7AtxF_xjCg1NnlD8sv2U',
        'AIzaSyAAUVCpxZ02PLVxggDA1lJQNcuvzQs9Kac',
    ]
    var randomNumber = Math.floor(Math.random() * keys.length);
    var key = keys[randomNumber]
    const fetchData = () => {
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value}&type=video&key=${key}`)
            .then(res => res.json())
            .then(value => {
                setLoading(false)
                setMiniCardData(value.items)
            })
    }
    const clearData = () => {
        setValue("")
    }
    return (
        <View style={globalStyles.container}>
            <View style={styles.searchRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <MaterialIcons name="arrow-back" onPress={() => navigation.goBack()}
                        size={28} color="#FF5722" />
                </TouchableOpacity>
                <TextInput style={styles.input} value={value} placeholder="Search..."
                    onChangeText={(text) => setValue(text)} />
                {value != "" ?
                    <TouchableOpacity
                        onPress={() => clearData()}
                        style={styles.close} >
                        <MaterialIcons name="close" size={18} color="#555" />
                    </TouchableOpacity>
                    : null}
                {value != "" ?
                    <TouchableOpacity onPress={() => fetchData()} >
                        <MaterialIcons name="send" size={28} onPress={() => {
                            fetchData(),
                                Keyboard.dismiss()
                        }}
                            color="#FF5722" />
                    </TouchableOpacity>
                    : null}
               
            </View>
            <FlatList
                data={miniCardData}
                renderItem={({ item }) =>
                    <SearchCard
                        videoId={item.id.videoId}
                        title={item.snippet.title}
                        channel={item.snippet.channelTitle}
                    />
                }
                keyExtractor={item => item.id.videoId}
                refreshing={loading}
                onRefresh={() => fetchData()}
            />
            <BannerAd unitId={string.bannerAds} size={BannerAdSize.SMART_BANNER} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        elevation: 5,
        alignItems: "center"
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#f0f5f5',
        backgroundColor: '#fff',
        borderRadius: 2,
        paddingHorizontal: 5,
        height: 40,
        marginHorizontal:5
    },
    bottom: {
        marginTop: 5
    },
    close: {
        position: 'absolute',
        right: 50,
        top: 14,
        backgroundColor: '#ddd',
        borderRadius: 10,
        padding: 2
    }
})