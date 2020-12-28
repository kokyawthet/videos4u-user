import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Empty() {
    return (
        <View style={{alignSelf:'center'}}>
            <Text style={styles.text}>No Data Found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        marginTop:5
    }
})
