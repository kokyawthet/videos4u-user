import React from 'react';
import { Text, View, Image, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

export default ImageHandler = ({ item}) => {
    const navigation = useNavigation();
    const videoId = youtube_parser(item.videouri);
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("VideoPlayer", { videoId: videoId })} >
            <Image source={{ uri: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` }}
                style={{ width: '100%', height: '75%',}} />
            <View style={styles.cardText}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 12 }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    category: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 3,
        marginLeft: 8,
        marginVertical: 3
    },
    cardContainer: {
        backgroundColor: "#29434e",
        width: Dimensions.get('screen').width / 3 - 8,
        height: 140,
        marginVertical: 3,
        marginHorizontal: 3,
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
        height: '25%',
    },
});
