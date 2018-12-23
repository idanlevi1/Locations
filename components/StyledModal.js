import React from 'react';
import { Modal, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { MonoText } from './StyledText';
import Layout from '../constants/Layout';
import { BRANDTS } from "../constants/Colors";
import { ButtonMono } from '../components/StyledButton';
import { TextInputMono } from '../components/StyledTextInput';
import { Types } from '../constants/Enums';
import Toast from 'react-native-simple-toast';

export class ModalStyled extends React.Component {
  state = {
    category: { name: '' },
    location:{
      name: '',
      address: '',
      coordinates: {latitude: 0, longitude: 0},
      category: 'food',
    }
  }

  componentDidMount = () => {
    console.log('CURR->>>>:',this.props.action,Types.LOCATIONS,this.props.type)
    if(this.props.action === 'Edit'){
      switch(this.props.type) {
        case Types.CATEGORIES:
          this.setState({category: this.props.currentItem || ''})
          break;
        case Types.LOCATIONS:
          this.setState({location: this.props.currentItem || ''})
          
          break;
        default:
          break;
      }
    }
  }
  
  canAction = () => {
    switch(this.props.type) {
      case Types.CATEGORIES:
        return this.state.category['name'] == '';
      case Types.LOCATIONS:
        const {location} = this.state;
        return (location['name'] == '' ||
        location['address'] == '' ||
        location['coordinates'] && location['coordinates']['latitude'] == '' ||
        location['coordinates'] && location['coordinates']['longitude'] == '' ||
        location['category'] == '')
      default:
        return false;
    }
  }

  actionItem = () => {
    let item = null;
    switch(this.props.type) {
      case Types.CATEGORIES:
        if(!this.props.categories.map(c=>c.name).includes(this.state.category.name)){
          item = this.state.category;
          this.setState({category: ''})
        }
        break;
      case Types.LOCATIONS:
        item = this.state.location;
        this.setState({location: ''})
      default:
        break;
    }
    if(item){
      this.props.onActionItem(item);
      this.props.setModalVisible();
    }
    else
      Toast.show('The Category already exist!', Toast.SHORT,Toast.BOTTOM)
  }

  InputsElement = () => {
    switch(this.props.type) {
      case Types.CATEGORIES:
        return (
          <TextInputMono
          value={this.state.category['name']}
          placeholder={'Name'}
          style={styles.input}
          maxLength={20}
          onChangeText={(input) => this.setState(prevState => ({category: {...prevState.category, name: input}}))}
          />
        )
        case Types.LOCATIONS:
        return (
        <React.Fragment>
          <TextInputMono
          value={this.state.location['name']}
          placeholder={'Name'}
          style={styles.input}
          maxLength={20}
          onChangeText={(input) => this.setState(prevState => ({location: {...prevState.location, name: input}}))}
          />
          <TextInputMono
          value={this.state.location['address']}
          placeholder={'Address'}
          style={styles.input}
          maxLength={25}
          onChangeText={(input) => this.setState(prevState => ({location: {...prevState.location, address: input}}))}
          />
          <MonoText style={styles.subtitle}>Coordinates</MonoText>
          <View style={styles.coordinates}>
            <TextInputMono
            value={this.state.location['latitude']}
            placeholder={'Lat'}
            style={[styles.input,styles.latlng]}
            maxLength={6}
            onChangeText={(input) => this.setState(prevState => ({location: {...prevState.location, coordinates: { ...prevState.location.coordinates, latitude: input}}}))}
            />
            <TextInputMono
            value={this.state.location['longitude']}
            placeholder={'lng'}
            style={[styles.input,styles.latlng]}
            maxLength={6}
            onChangeText={(input) => this.setState(prevState => ({location: {...prevState.location, coordinates: { ...prevState.location.coordinates ,longitude: input}}}))}
            />
          </View>
          <MonoText style={styles.subtitle}>Categoty</MonoText>
        </React.Fragment>
        )
      default:
        break;
    }
  }

  render() {
    const { modalVisible, type, action, setModalVisible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <KeyboardAvoidingView style={[styles.container,type===Types.CATEGORIES && {height: Layout.window.height * .5}]} behavior="padding">
        <ButtonMono 
        _backgroundColor={'transparent'} 
        _color={BRANDTS.three}
        _fontSize={22}
        _padding={5}
        _text={'X'}
        style={styles.closeButton}
        onClick={setModalVisible}
        disabled={false}
        />
        <MonoText style={styles.title}>{action} {type}</MonoText>
        {this.InputsElement()}
        <ButtonMono 
        _backgroundColor={this.canAction() ? BRANDTS.four : BRANDTS.one} 
        _color={BRANDTS.three}
        _fontSize={18}
        _text={action}
        onClick={() => {this.actionItem();}}
        disabled={this.canAction()}
        />
        </KeyboardAvoidingView>
      </Modal>
    );  
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Layout.window.height * .05,
    height: Layout.window.height * .8,
    width: Layout.window.width * .8,
    backgroundColor: BRANDTS.two,
    borderWidth: 3,
    borderColor: BRANDTS.four,
    borderRadius: 10,
  },
  flatview:{
    width: Layout.window.width
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    color: BRANDTS.one,
    marginVertical: 2,
  },
  input:{
    borderBottomWidth: 2,
    width: Layout.window.width * .5,
    height: 35,
    fontSize: 20,
    paddingHorizontal: 10,
    color: BRANDTS.three,
    marginVertical: 5,
  },
  closeButton:{
    position: 'absolute',
    top: 5,
    left: 5,
  },
  coordinates:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  latlng:{
    width: Layout.window.width * .25,
    paddingHorizontal: 2,
    marginHorizontal: 5,
  }
  });
  