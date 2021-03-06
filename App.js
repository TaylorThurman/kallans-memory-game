import * as React from 'react';
import * as Font from 'expo-font';
import {StackNavigator} from 'react-navigation';

import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";

const MyRoutes = StackNavigator({
        HomeRT: {
            screen: HomeScreen
        },
        TestRT: {
            screen: TestScreen
        }
    },
    {
        initialRouteName: 'HomeRT'
    });

export default class App extends React.Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'monster-rat': require('./assets/fonts/Montserrat-Bold.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    render() {
        return (
            <MyRoutes screenProps={{fontLoaded: this.state.fontLoaded}}/>
        );
    }
}
