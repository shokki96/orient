import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, StatusBar, Image, FlatList, ActivityIndicator, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { Drawer, Container,  Header, Left,  Button, Title, Body, Content,  Right, Thumbnail ,List, ListItem, Icon } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import HTML from 'react-native-render-html';
import Ion from 'react-native-vector-icons/Ionicons';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Detail extends Component<{}> {
  static navigationOptions = {
    header: null,
    };


  constructor(props){
    super (props)

    this.state = {
      detailTitle: this.props.navigation.state.params.detailTitle,
      detailImg: this.props.navigation.state.params.detailImg,
      detailContent: this.props.navigation.state.params.detailContent,
      detailViews: this.props.navigation.state.params.detailViews,

    }
  }

  render() {
    // tagsStyles: { img: { height: 100 } }

    const html = `${this.state.detailContent}`

    const { state, navigate } = this.props.navigation;

    return (

      <HeaderImageScrollView

            maxHeight={220}
            minHeight={60}
            headerImage={{uri : this.state.detailImg}}
            overlayColor="#13af52"
            maxOverlayOpacity={0.5}
            minOverlayOpacity = {0.1}
            renderFixedForeground={() => (

              <View style = {{margin: 'auto', marginTop: 10}}>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' style={{fontSize:20, fontWeight: 'bold', color:'#ffffff', marginLeft: 10, marginRight: 10 }}/>
              </Button>
              </View>
                     )}

          >

      <Content style = {{paddingLeft: 10, paddingRight: 10, paddingBottom: 20}}>
        <TriggeringView onHide={() => console.log('text hidden')} >
          <Text style = {{fontWeight: 'bold', color: 'black', fontSize: 18, paddingTop: 10,textTransform: 'capitalize'}}>
             {this.state.detailTitle}
          </Text>
        </TriggeringView>

    <HTML html={html.replace(/width=/g, "") }  imagesMaxWidth={Dimensions.get('window').width}/>

      <View style = {{paddingTop: 15, paddingBottom:5, margin: 'auto', }}>
        <Ion name='md-eye' style={{fontSize:20, color:'#575757', marginLeft: 30, marginRight: 20, textAlignVertical: 'center' }}/>
        <Text style = {{color: '#575757', fontSize: 13, paddingTop: 5}}>{this.state.detailViews + ' ПРОСМОТР'}</Text>
      </View>
      </Content>

       </HeaderImageScrollView>
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
