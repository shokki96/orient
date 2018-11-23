import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, StatusBar, Image, FlatList, ActivityIndicator } from 'react-native';
import { Drawer, Container,  Header, Left, Icon, Button, Title, Body, Content,  Right, Thumbnail ,List, ListItem } from 'native-base';



export default class Detail extends Component<{}> {

  constructor(props){
    super (props)

    this.state = {
      detailTitle: this.props.navigation.state.params.detailTitle
    }
  }

  render() {
    return (
      <View>
        <Text>
          Test {this.state.detailTitle}
        </Text>
      </View>
    )
  }
}
