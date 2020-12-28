import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { globalStyles,string } from '../components/globalStyle';
import ImageHandler from '../components/Image';
import Empty from '../components/Empty';
import * as Firebase from 'firebase';
import { InterstitialAd, BannerAd, BannerAdSize } from '@react-native-firebase/admob';

export default function Cartoon() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getCategoryPost();
    }, [])

    const getCategoryPost = () => {
        setLoading(true)
        var tasksRef = Firebase.database().ref('/posts/').orderByChild("catId")
            .equalTo("-MOZAYws6UegxUYuTiew");
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
            tasks.reverse();//first in last out
            setLoading(false)
            setPosts(tasks);
        });
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <ImageHandler item={item} />
                    )
                }}
                keyExtractor={(k, v) => v.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={Empty}
                style={{ marginBottom: 3 }}
                numColumns={1}
                refreshing={loading}
                onRefresh={() => getCategoryPost()}
            />
            <BannerAd unitId={string.bannerAds} size={BannerAdSize.SMART_BANNER} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
