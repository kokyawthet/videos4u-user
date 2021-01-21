import React from 'react'
import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import { globalStyles,string} from '../components/globalStyle';
import ImageHandler from '../components/Image';
import Empty from '../components/Empty';
import fire from '../fire';
import * as Firebase from 'firebase';
import { InterstitialAd, BannerAd, BannerAdSize } from '@react-native-firebase/admob';


export default class Home extends React.Component{
    state = {
        loading: false,
        posts:[]
    }
    componentDidMount() {
        this.getLatestPosts()
    }
    getLatestPosts = () => {
        var tasksRef = Firebase.database().ref('/posts/').limitToLast(18);
        this.setState({ loading: true })
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
            this.setState({ loading: false,posts:tasks })
        });
    }

    render() {
        if (this.state.loading == true)
        {
            return (
                <View style={styles.container}>
                    <Image
                        source={require('../image/app.gif')}
                        style={styles.image}
                    />
                </View>
            )
        }
        return (
            <View style={globalStyles.container}>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => <ImageHandler item={item} />}
                    keyExtractor={(k, v) => v.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={Empty}
                    numColumns={3}
                    onRefresh={() => this.getLatestPosts()}
                    refreshing={this.state.loading}
                    style={{alignSelf:'center'}}
                />
                <BannerAd unitId={string.bannerAds} size={BannerAdSize.SMART_BANNER} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
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
        alignSelf: 'center',
        width:"80%",
        height:"30%",
    },
    loading: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        paddingBottom: 15
    }
})

