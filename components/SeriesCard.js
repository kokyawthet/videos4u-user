import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function SeriesCard({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => { navigation.navigate("Episodes", { seriesId: item.key }) }} >
            <Image source={{ uri: item.image }} style={{ width: '100%', height: '85%' }} />
            <View style={styles.cardText}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 14 }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#29434e",
        width: "47%",
        height: 160,
        marginVertical: 5,
        marginHorizontal:6,
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
        paddingBottom: 4,
        height: '15%',
    },
})
