import * as React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Alert,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
            counter: 10,
            imagesLoaded: false,
            resultSet: [],
            imageURL: 'https://images.unsplash.com/photo-1491446559770-3fc03a481cdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
            urls: [],
        };
    }

    componentDidMount = () => {
        // this.callUnsplashAPI();
        // this.displayImages();
    };

    alert = () => {
        Alert.alert('hi', 'hi')
    };

    callUnsplashAPI = () => {
        const url = 'https://api.unsplash.com/search/photos?client_id=do0K63iwfoEXx3y_LcJ9Kc8WMmCZkK8wRoMB43-qVJ0&query=travel&page=1&per_page=50';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                let urls = [];
                for (let i = 0; i < 30; i++) {
                    urls.push(Array.from(res.results)[i].urls.raw);
                    this.setState({
                        urls: urls
                    })
                }
            })
            .catch(err => console.log(err));
    };

    displayImages() {
        let i = 1;
        setInterval(() => {
            i += 1;
            this.setState({imageURL: this.state.urls[i], imagesLoaded: true})
        }, 10000);
    }

    startGame = () => {
        this.setState({gameStarted: true})
        this.counter();
    };

    counter = () => {
        let i = 10;
        setInterval(() => {
            if (i > 0) {
                i -= 1;
                this.setState({counter: i});
            }
        }, 1000);
    };

    render() {
        return (
            <ImageBackground style={{flex: 1}} source={require('../assets/images/home-screen-wallpaper.jpeg')}>
                <SafeAreaView>

                    <View style={{
                        margin: 15,
                        marginTop: 40,
                        padding: 15
                    }}>
                        {this.props.screenProps.fontLoaded ? (
                            <Text
                                style={{
                                    fontSize: 48,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: 'monster-rat'
                                }}>
                                Welcome Kallan!
                            </Text>
                        ) : null}
                        {this.props.screenProps.fontLoaded ? (
                            <Text
                                style={{
                                    marginTop: 5,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: 'monster-rat'
                                }}>
                                Are you ready to test your memory?
                            </Text>
                        ) : null}
                    </View>
                </SafeAreaView>

                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TestRT')}
                                          style={{
                                              padding: 10,
                                              backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                              width: '50%',
                                              alignItems: 'center'
                                          }}>
                            <Ionicons name='ios-play-circle'
                                      style={{
                                          color: 'white',
                                          marginBottom: 10
                                      }}
                                      size={20}/>
                            {this.props.screenProps.fontLoaded ? (
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'monster-rat'
                                    }}>
                                    Start Test
                                </Text>
                            ) : null}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Alert.alert('hi', 'hi')}
                                          style={{
                                              padding: 10,
                                              backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                              width: '50%',
                                              alignItems: 'center'
                                          }}>
                            <Ionicons name='ios-podium'
                                      style={{
                                          color: 'white',
                                          marginBottom: 10
                                      }}
                                      size={20}/>
                            {this.props.screenProps.fontLoaded ? (
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'monster-rat'
                                    }}>
                                    Previous Test Scores
                                </Text>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
