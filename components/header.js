import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function header() {
    const navigation = useNavigation();
    return (
        <View style={styles.rightHeader}>
            <TouchableOpacity
                onPress={()=>navigation.navigate("Search")}
                style={{ borderRadius: 20, }}
            >
                <MaterialIcons name="search" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rightHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
})
