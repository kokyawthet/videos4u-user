import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image } from 'react-native'
import { StackActions } from '@react-navigation/native'
import * as Firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'


export default function Loading({ navigation }) {
    const [loading, setLoading] = useState(false);
    const setCurrentPost = useDispatch();
    useEffect(() => {
        getCategoryPost();
    })
    const action = () => {
        navigation.dispatch(StackActions.replace('RootHome'));
    }

    const getCategoryPost = () => {
        var tasksRef = Firebase.database().ref('/posts/').orderByChild("catId").limitToLast(25);
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
            setLoading(true)
            setCurrentPost({ type: "add", payLoad: tasks })
            loading && action();
        });
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('../image/app.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Videos For You!</Text>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        color: '#666666',
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 30
    },
    image: {
        width: '80%',
        height: '40%',
        alignSelf:'center'
    },
    loading: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        paddingBottom:15
    }
})
