import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import { globalStyles,string} from '../components/globalStyle';
import ImageHandler from '../components/Image';
import Empty from '../components/Empty';
import fire from '../fire';
import * as Firebase from 'firebase';
import { InterstitialAd, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { useDispatch, useSelector } from 'react-redux'


export default function Home() {
    const [loading, setLoading] = useState(false)
    const getCurrentPost = useSelector(state => {
        return state.post;
    })

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={getCurrentPost}
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
            />
            <BannerAd unitId={string.bannerAds} size={BannerAdSize.SMART_BANNER} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})
