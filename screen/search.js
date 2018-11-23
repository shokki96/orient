import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, StatusBar, Image, FlatList, ActivityIndicator, ScrollView, Dimensions, TouchableHighlight,KeyboardAvoidingView } from 'react-native';
import { Drawer, Container,  Header, Left,  Button, Title, Body, Content,  Right, Thumbnail ,List, ListItem, Icon, Input, Item } from 'native-base';

// import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import HTML from 'react-native-render-html';


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Search extends Component<{}> {
  // static navigationOptions = {
  //      title: 'Поиск',
  //      headerStyle: {
  //      backgroundColor: '#13af52',
  //      elevation: null},
  //      headerTintColor: "#fff",
  //
  //    };


  static navigationOptions = {
      header: null

     };


  constructor(props){
    super (props)
    this.state = {
      urlAd: this.props.navigation.state.params.urlAd,
      catId: this.props.navigation.state.params.catId,
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      text: '',
      arrayholder : [],
      dataBackup : [],
      pageBackup: 1
    }

  }


  componentDidMount () {
    this.makeRemoteRequest();

  }


  makeRemoteRequest = () =>{
  const {catId, page, urlAd} = this.state;
  const url = `${urlAd}` + `?id=${catId}&page=${page}`
  this.setState({ loading: true});
  setTimeout(() => {
    fetch (url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.posts : [...this.state.data, ...res.posts],
          error: res.error || null,
          loading: false,
          refreshing: false,
          arrayholder : page === 1 ? res.posts : [...this.state.data, ...res.posts],
          dataBackup: page === 1 ? res.posts : [...this.state.data, ...res.posts]
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false});
      });
  },1500);
};



handleRefresh = () =>{
  this.setState({
    page: 1,
    refreshing: true
  }), () =>{
    this.makeRemoteRequest();
  }
}

handleLoadMore = () =>{
  this.setState({
    page: this.state.page + 1,
  }, () => {
    this.makeRemoteRequest();
  })
}

renderFooter = () =>{
  return (
    <View style ={{ paddingVertical: 20, borderTopWidth: 0}}>
      <ActivityIndicator animating size="large"/>
    </View>
  );
};

SearchFilterFunction(text){

     const newData = this.state.arrayholder.filter((item)=>{
       const itemData = item.title.toUpperCase()
       const textData = text.toUpperCase()
     return itemData.indexOf(textData) > -1


     })
     this.setState({
         data: this.textData === null ? dataBackup : newData,
         page: this.textData === null ? 1 : this.state.page,
         text: text,
     })


 }


  render() {

    const { state, navigate } = this.props.navigation;

    return (
      <Container>
      <Header searchBar rounded style={{backgroundColor: '#13af52'}}>
      <MyStatusBar backgroundColor="#13af52" barStyle="light-content" />
      <View style = {{paddingRight: 0, marginLeft: 0}}>
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name='arrow-back' style={{fontSize:20, fontWeight: 'bold', color:'#ffffff', marginLeft: 10, marginRight: 10 }}/>
      </Button>
      </View>
          <Item style = {{backgroundColor: '#04923d'}}>
            <Icon name="ios-search" style = {{color: 'white'}}/>
            <Input placeholder="Поиск" placeholderTextColor= 'white' style = {{color: 'white', }} onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}/>
          </Item>


      </Header>
<View style={{flex: 1, backgroundColor: 'transparent'}} >
      <List >
          <FlatList
          data = {this.state.data}
            renderItem={({ item }) => (
              <ListItem thumbnail onPress={() => navigate('detail', { detailTitle: item.title, detailContent: item.content, detailImg: item.thumbnail_images.large.url, detailViews: item.views })}>
                <Left>
                  <Thumbnail square source = {{ uri: item.thumbnail_images == null ?  "http://orient.tm/wp-content/uploads/2018/11/ФОТО-1-НА-ЗАГОЛВОК-150x150.jpg" : item.thumbnail_images.thumbnail.url}} style = {{width: 75, height: 75}}/>
                </Left>
                <Body>
                  <Text style = {{fontWeight: 'bold', color: 'black'}}>{item.title}</Text>
                  <Text style = {{color: '#13af52', fontSize: 14, paddingTop: 5}}>{item.category.title}</Text>
                </Body>
                <Right>
                </Right>
              </ListItem>
            )}

            keyExtractor={item => item.title}
            ListFooterComponent = {this.renderFooter}
            refreshing ={this.state.refreshing}
            onRefresh = {this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0.01}
            />
      </List>
      </View>
      </Container>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 20,
  },

});
