import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    LayoutAnimation,
    Keyboard,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import {Input, Card} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';

class TestScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
            timer: 0,
            isCenter: true
        };

        this.bottomViewHeight = new Animated.Value(0);
        this.timerSize = new Animated.Value(125);
        this.timerSizeBorderRadius = new Animated.Value(70);
    }

    playGame = async () => {
        this.setState({gameStarted: true});
        // increases bottom view while decreasing top image
        this.pullBottomViewUp();
        // initial count down till game starts
        await this.startCountDown(3);
        // shrink and move circle to bottom right
        await this.animateTimerCircle();
        // timer for questions TODO loop through X amount for each question
        for (let i = 0; i < 5; i++) {
            await this.startCountDown(5);
            await new Promise((resolve => setTimeout(resolve,1000)));
        }
    };

    pullBottomViewUp() {
        Animated.timing(this.bottomViewHeight, {
            duration: 500,
            toValue: 2,
        }).start();
    }

    startCountDown = (time) => {
        return new Promise((resolve, reject) => {
            this.setState({timer: time});
            let timerCountDown = setInterval(() => {

                this.setState({timer: this.state.timer - 1});
                if (this.state.timer === 0) {
                    clearInterval(timerCountDown);
                }
            }, 1000);
            setTimeout(resolve, (time * 1000) + 500);
        })

    };

    animateTimerCircle = () => {
        // move circle from center to bottom right
        return new Promise((resolve) => {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(500, LayoutAnimation.Types.linear)
            );
            this.setState({isCenter: false});
            // shrink timer circle
            Animated.timing(this.timerSize, {duration: 500, toValue: 75}).start();
            Animated.timing(this.timerSizeBorderRadius, {duration: 500, toValue: 37.5}).start();
            setTimeout(resolve, 1000);
        });
    };

    render() {
        return (
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
                            {/*GAME STARTED COUNT DOWN CIRCLE*/}
                            {this.state.gameStarted && (
                                <View style={{
                                    flex: 1,
                                    alignItems: this.state.isCenter ? 'center' : 'flex-end',
                                    justifyContent: this.state.isCenter ? 'center' : 'flex-end'
                                }}>
                                    <Animated.View style={{
                                        margin: 15,
                                        backgroundColor: 'white',
                                        width: this.timerSize,
                                        height: this.timerSize,
                                        borderRadius: this.timerSizeBorderRadius,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 48,
                                            color: 'black'
                                        }}>
                                            {this.state.timer < 0 ? 0 : this.state.timer}
                                        </Text>
                                    </Animated.View>
                                </View>
                            )}
                        </View>
                    </ImageBackground>
                </View>

                {/*GAME STARTED*/}
                {this.state.gameStarted && (
                    <Animated.View
                        style={{
                            flex: this.bottomViewHeight,
                            backgroundColor: '#fff'
                        }}>
                        <ScrollView>
                            <Card>
                                <View style={{alignItems: 'center'}}>
                                    <Text>A3D 8DX</Text>
                                </View>
                                <TextInput autoFocus={true}/>
                            </Card>
                        </ScrollView>
                    </Animated.View>
                )}
            </View>
        );
    }
}

export default TestScreen;
