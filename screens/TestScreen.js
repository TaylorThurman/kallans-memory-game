import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Keyboard,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native';
import {Input} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';

class TestScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false
        };

        this.imageHeight = new Animated.Value(1);
    }

    playGame = () => {
        this.setState({gameStarted: true});

        Animated.timing(this.imageHeight, {
            duration: 250,
            toValue: 2,
        }).start();
    };

    render() {
        return (
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <ImageBackground
                            style={{
                                flex: 1
                            }}
                            source={{uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'}}>

                            <View style={{
                                flex: 1,
                            }}>

                                {/*GAME NOT STARTED*/}
                                {!this.state.gameStarted && (
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => this.playGame()}
                                            style={{
                                                flex: 1,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            {this.props.screenProps.fontLoaded ? (
                                                <Text style={{
                                                    fontSize: 36,
                                                    color: 'white',
                                                    fontFamily: 'monster-rat'
                                                }}>
                                                    Get Ready To Play
                                                </Text>
                                            ) : null}
                                            <Ionicons name='ios-play-circle'
                                                      style={{
                                                          color: 'white',
                                                          marginTop: 10
                                                      }}
                                                      size={80}/>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </ImageBackground>
                    </View>

                    {/*GAME STARTED*/}
                    {this.state.gameStarted && (
                        <Animated.View
                            style={{
                                flex: this.imageHeight,
                                backgroundColor: '#fff'
                            }}>

                            <Input placeholder={'Hi'}/>
                            {/*<Text>Hi</Text>*/}
                        </Animated.View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default TestScreen;
