import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Content, Card, CardItem, Text, Right, ListItem, Left,Body, List} from 'native-base';
import { FlatList, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import detail from './detail';

export default class MenuSamping extends Component {
  constructor (props){
    super (props);
    this.state = {
      data: [],
    };
  }

 componentDidMount () {
   this.makeRemoteRequest();
 }

 makeRemoteRequest = () =>{
   const url = `http://orient.tm/api/core/get_category_index`
     fetch (url)
       .then(res => res.json())
       .then(res => {
         this.setState({
           data: [...this.state.data, ...res.categories],

         });
       })
 }

  render(){

    return(
      <Content  style={{backgroundColor: '#ffffff'}}>
      <List >
          <FlatList
          data = {this.state.data}
            renderItem={({ item }) => (
              <ListItem   onPress={() => navigation.navigate("detail")}>
                <Left >
                  <Icon active name="newspaper-o" style={{color:"#0A8A2A", fontSize:25, paddingRight: 20}} />
                </Left>
                <Body >
                  <Text style={{color:'black', flex: 2, flexWrap: 'wrap', fontSize: 15}}>{item.title}</Text>
                </Body>
                <Right >

                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.title}
            />
      </List>
      </Content>
    )
  };
}
