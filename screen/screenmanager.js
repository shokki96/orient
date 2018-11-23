import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from './mainscreen';
import MenuSamping from './MenuSamping';
import detail from './detail';
import Search from './search';



const Screens = StackNavigator({

  MainScreen: {screen: MainScreen},
  Search: {screen: Search},
  MenuSamping: {screen: MenuSamping},
  detail: {screen: detail},

},{
  initialRouteName: 'MainScreen'
});

export default Screens;
