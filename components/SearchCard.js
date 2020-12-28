import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MiniCard = (props) => {
    const navigation = useNavigation();
    const textcolor = "#444"
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("VideoPlayer",
                { videoId: props.videoId})}
        >
            <View style={styles.container}>
                <Image source={{ uri: `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg` }}
                    style={styles.bgImage} />
                <View style={styles.row}>
                    <Text style={{ ...styles.videoTitle, color: textcolor }} ellipsizeMode='tail'
                        numberOfLines={3}>{props.title}</Text>
                    <Text
                        style={{ ...styles.videoChannel, color: "#000" }}
                        numberOfLines={3} ellipsizeMode='tail'>
                       #Credit {props.channel}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
        elevation: 3,
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    bgImage: {
        width: "45%",
        height: 100,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
    },
    videoTitle: {
        fontSize: 16,
        width: Dimensions.get('screen').width / 2
    },
    videoChannel: {
        fontSize: 14,
        marginTop: 5,
    },
    row: {
        marginLeft: 5
    }


});

export default MiniCard