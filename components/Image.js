import React from 'react';
import { Text, View, Image, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

export default ImageHandler = ({ item}) => {
    const navigation = useNavigation();
    const videoId = youtube_parser(item.videouri);

    return (
        <View style={styles.row}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() =>navigation.navigate("Setting")}
                >
                    <Image source={require("../image/app.png")}  style={styles.icon} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Videos", { catId: item.catId })}>
                        <Text style={styles.appname}>Videos For You</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("VideoPlayer", { videoId: videoId })}
                style={{backgroundColor:"#333",width:'70%',alignSelf:'center'}}
            >
                <Image source={{ uri: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` }}
                    style={styles.image} />
                <View style={styles.imageOverlay}></View>
                <View style={styles.video} >
                    <Feather name="play-circle" size={40} color="#E64A19" />
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    row: {
        marginHorizontal: 14,
        justifyContent: 'center',
        marginTop: 5,
        borderWidth: 0.5,
        padding: 3,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        elevation: 3,
        paddingBottom:8
    },
    appname: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop:6
    },
    title: {
        color: '#000',
        fontSize: 16,
        marginLeft: 12,
        marginBottom:5
    },
    header: {
        flexDirection: 'row',
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#f2f2f2',
        elevation:2
    },
    imageOverlay: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.3,
        width: '100%',
        height: 150,
        borderRadius: 4,
        alignSelf: 'center',
        bottom:5
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom:5
    },
    video: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 40,
        top: 60,
        alignSelf: 'center'
    },
    icon: {
        width: 35, height: 35,
        borderRadius: 20, borderWidth: 1,
        borderColor: "#fff", padding: 5
    }
});
