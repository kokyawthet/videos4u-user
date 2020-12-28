import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useTheme } from '@react-navigation/native';


export default function headerSearch() {
    const navigation = useNavigation();
    const [text, setText] = useState("");

    const clearData = () => {
        setText("")
    }

    return (
        <View style={styles.searchRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <MaterialIcons name="arrow-back" onPress={() => navigation.goBack()}
                    size={32} color="#fff" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                autoFocus={true}
                value={text}
                onChangeText={(text) => {
                    setText(text);
                    searchData(text);
                }}
                placeholder="Search..."
            />
            {text != "" ?
                <TouchableOpacity
                    onPress={() => clearData()}
                    style={styles.close} >
                    <MaterialIcons name="close" size={18} color="#555" />
                </TouchableOpacity>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        alignItems: "center",
        shadowColor: '#000',
        paddingBottom: 5,
        backgroundColor:'#FF5722'
    },
    input: {
        width: '90%',
        borderWidth: 0.5,
        borderColor: '#f0f5f5',
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingLeft: 10,
        height: 40,
        marginHorizontal: 3,
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
