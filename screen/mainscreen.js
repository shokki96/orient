import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, StatusBar, Image, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Drawer, Container,  Header, Left, Button, Icon, Title, Body, Content,  Right, Thumbnail ,List, ListItem, Spinner } from 'native-base';
import { StackNavigator } from 'react-navigation';
import SideBar from './MenuSamping';
import Em from 'react-native-vector-icons/FontAwesome';
import Ion from 'react-native-vector-icons/Ionicons';



const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);



  export default class MainScreen extends Component<{}> {

  static navigationOptions = {
header: null,
};

  constructor (props){
    super (props);

    this.state = {
      urlAd: `http://orient.tm/api/core/get_category_posts`,
      catId: 2,
      loading: false,
      dataCat: [],
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      onEndReachedCalledDuringMomentum: true
    };
  }

     closeDrawer() {
       this._drawer._root.close()
     };
     openDrawer() {

       this._drawer._root.open()
     };

    // state = { data: [] };
    componentDidMount () {
      this.makeRemoteRequest();
      this.makeRemoteRequestCat();
    }


    makeRemoteRequest = () =>{
    const {page, catId, urlAd} = this.state;
    if (catId == 1) {
      return
    }
    const url = `${urlAd}?id=${catId}&page=${page}&count=10`;

    this.setState({ loading: true});
    setTimeout(() => {
      fetch (url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: page === 1 ? res.posts : [...this.state.data, ...res.posts],
            error: res.error || null,
            loading: false,
            refreshing: false
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

  handleLoadMore = ({distanceFromEnd}) =>{
    if(!this.onEndReachedCalledDuringMomentum){
       this.makeRemoteRequest();
       this.setState({
         page: this.state.page + 1,
         onEndReachedCalledDuringMomentum: true
       })
     }
  }


  catIdC = (id) =>{
    this.closeDrawer();
    this.setState({
      urlAd: `http://orient.tm/api/core/get_category_posts`,
      catId: id,
      page: 1,
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
    })
  }

  catAll = () =>{
    this.closeDrawer();
    this.setState({
      urlAd: `http://orient.tm/api/core/get_recent_posts`,
      catId: null,
      page: 1,
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
    })
  }



  makeRemoteRequestCat = () =>{
    const url = `http://orient.tm/api/core/get_category_index`
      fetch (url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            dataCat: [...this.state.dataCat, ...res.categories],

          });
        })
  }

renderFooter = () =>{
  return (
    <View style ={{ paddingVertical: 20, borderTopWidth: 0}}>
      <ActivityIndicator animating size="large"/>
    </View>
  );
};


  render() {
    const {navigate} = this.props.navigation

    return (

    <Drawer
       content={
         <Container>
              <MyStatusBar backgroundColor="white" barStyle="light-content" />


         <Content  style={{backgroundColor: '#ffffff',}}>

       <List style = {{paddingBottom: 30}}>
         <ListItem icon noBorder onPress={() => this.catAll()}>
           <Left >
              <Image source={require('./imgs/icons/all_section.png')}  style={{width:23, height: 22,}} />
           </Left>
           <Body >
             <Text style={{color:'black', fontSize: 15}}>Все рубрики</Text>
           </Body>
           <Right >
           </Right>
         </ListItem>
           <FlatList
           data = {this.state.dataCat}
             renderItem={({ item }) => (

               <ListItem icon noBorder onPress={() => this.catIdC(item.id)}>
                 <Left >
                    <Image source={require('./imgs/icons/section.png')}  style={{width:23, height: 25,}}  />
                 </Left>
                 <Body style = {{paddingRight: 15}}>
                   <Text style={{color:'black', fontSize: 15, flexWrap: "wrap"}}>{item.title}</Text>
                 </Body>
                 <Right >
                 </Right>
               </ListItem>
             )}
             keyExtractor={item => item.title}
             />
             <ListItem icon noBorder>
               <Left >
                  <Image source={require('./imgs/icons/favourites.png')}  style={{width:23, height: 21,}} />
               </Left>
               <Body >
                 <Text style={{color:'black', fontSize: 15}}>Избранные</Text>
               </Body>
               <Right >
               </Right>
             </ListItem>

             <ListItem icon noBorder>
               <Left >
                  <Image source={require('./imgs/icons/settings.png')}  style={{width:23, height: 23,}} />
               </Left>
               <Body >
                 <Text style={{color:'black', fontSize: 15}}>Настройки</Text>
               </Body>
               <Right >
               </Right>
             </ListItem>


       </List></Content></Container>}

       type = "overlay"
        ref={(ref) => this._drawer = ref}
       onClose={() => this.closeDrawer()} >
       <Container >
          <View style={{header: null, backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent', borderBottomWidth: 0, position: 'absolute'}}>
          <MyStatusBar backgroundColor="#13af52" barStyle="light-content" />
            <Image source={require('./imgs/header.png')}  style={{width:'100%', height: '100%', position: 'absolute', marginTop: 15 }}  />
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <View style = {{flex: 1}}>
                        <Button style = {{marginBottom: 20, paddingLeft: 15,}} transparent onPress = {() => this.openDrawer()}>
                            <Ion name = 'ios-menu' style = {{fontSize: 22, color: 'white'}}/>
                        </Button>
                    </View>
                    <View>
                    </View>
                    <View >
                        <Button style = {{marginBottom: 20, paddingRight: 20}} transparent onPress={() => navigate('Search', { catId: this.state.catId, urlAd: this.state.urlAd })}>
                            <Ion name = 'ios-search' style = {{fontSize: 22, color: 'white'}}/>
                        </Button>
                    </View>
                </View>

          </View>



<Content padder={false}>

          <List style = {{marginRight: 5, top: 100, marginBottom: 100, }} contentContainerStyle={{flex: 1}} >
              <FlatList
              data = {this.state.data}
                renderItem={({ item }) => (
                <ListItem thumbnail style = {{paddingTop: 1, paddingBottom: 1, marginTop: 2, marginBottom: 2}} onPress={() => navigate('detail', { detailTitle: item.title, detailContent: item.content, detailImg: item.thumbnail_images.large.url, detailViews: item.views })}>
                    <Left>
                      <Thumbnail square source = {{ uri: item.thumbnail_images == null ?  "http://orient.tm/wp-content/uploads/2018/11/ФОТО-1-НА-ЗАГОЛВОК-150x150.jpg" : item.thumbnail_images.thumbnail.url}} style = {{width: 75, height: 75}}/>
                    </Left>
                    <Body style = {{paddingRight: 15}}>
                      <Text style = {{fontWeight: 'bold', color: 'black'}}>{item.title}</Text>
                    </Body>
                  </ListItem>
                )}

                keyExtractor={item => item.url}
                catIdC ={this.catIdC}
                ListFooterComponent = {this.renderFooter}
                refreshing ={this.state.refreshing}
                onRefresh = {this.handleRefresh}
                onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.01}
                //onEndReached = {debounce(this.han, 500)}
                //onEndReached={this.handleLoadMore.bind(this)}
                //onEndReachedThreshold={0.5}
                //onMomentumScrollBegin={() => {    this.setState({ onEndReachedCalledDuringMomentum : false }) }}


                />

          </List>
</Content>
    </Container>
    </Drawer>
    );
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
