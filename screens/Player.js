import React from 'react';
import {
    StyleSheet, View, Text, PixelRatio,  Dimensions,
} from 'react-native';
import YouTube from 'react-native-youtube';
import KeepAwake from 'react-native-keep-awake';
import { WebView } from 'react-native-webview';



export default class Player extends React.Component{
    state = {
        isReady: false,
        status: null,
        quality: null,
        error:null,
        isPlaying: true,
        isLooping: true,
        duration: 0,
        currentTime: 0,
        fullscreen: false,
        playerWidth: Dimensions.get('window').width,
        videoId: this.props.route.params.videoId,
        apikey:'AIzaSyCcOOumHBij1VhD6bNjzr7GQc5fu1yH-IE'
    };
    componentDidMount() {
        this.apiAction()
        this.changeKeepAwake(true)
    }

    apiAction() {
        var keys = [
            'AIzaSyC6UQ00RGG3ct87Ik1-trhumZjYNy5O5Rg',
            'AIzaSyDMaZtjGpBf4gqu71cJONcZ4afrSUtFXXo',
            'AIzaSyCcOOumHBij1VhD6bNjzr7GQc5fu1yH-IE',
        ]
        var randomNumber = Math.floor(Math.random() * keys.length);
        var key = keys[randomNumber]
        this.setState({ apiKey: key })
    }

    changeKeepAwake(shouldBeAwake) {
    if (shouldBeAwake)
        {
            KeepAwake.activate();
        } else
        {
            KeepAwake.deactivate();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.error == null ?
                    <YouTube
                        ref={this._youTubeRef}
                        apiKey={this.state.apikey}
                        videoId={this.state.videoId}
                        play={this.state.isPlaying}
                        loop={this.state.isLooping}
                        fullscreen={this.state.fullscreen}
                        controls={1}
                        style={[
                            { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)),marginTop:Dimensions.get("screen").height/3 },
                            styles.player,
                        ]}
                        onError={e => {
                            this.setState({ error: e.error });
                        }}
                        onReady={e => {
                            this.setState({ isReady: true });
                        }}
                        onChangeState={e => {
                            this.setState({ status: e.state });
                        }}
                        onChangeQuality={e => {
                            this.setState({ quality: e.quality });
                        }}
                        onChangeFullscreen={e => {
                            this.setState({ fullscreen: e.isFullscreen });
                        }}
                        onProgress={e => {
                            this.setState({ currentTime: e.currentTime });
                        }}
                    />
                :
                    <WebView
                        source={{ uri: `https://www.youtube.com/embed/${this.state.videoId}` }}
                        style={styles.web}
                    />
                }
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        flex:1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingBottom: 5,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    player: {
        alignSelf: 'stretch',
        marginVertical: 10,
    },
    web: {
        backgroundColor: '#333',
    }
});