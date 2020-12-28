import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { globalStyles } from '../components/globalStyle';
import Empty from '../components/Empty';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SearchCard from '../components/SearchCard';


export default function EpisodesVideos({ route }) {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const { value } = route.params;
    useEffect(() => {
        fetchData();
    }, [])

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
                setPosts(value.items)
            })
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
                ListEmptyComponent={Empty}
            />
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
})
