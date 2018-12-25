import React from 'react';
import { Modal, StyleSheet, KeyboardAvoidingView, View, Picker, ScrollView, ActivityIndicator } from 'react-native';
import { MonoText } from './StyledText';
import Layout from '../constants/Layout';
import { BRANDTS } from "../constants/Colors";
import { ButtonMono } from '../components/StyledButton';
import { TextInputMono } from '../components/StyledTextInput';
import { Types } from '../constants/Enums';
import Toast from 'react-native-simple-toast';
import MapView,{Marker} from 'react-native-maps';
import { Location, Permissions } from 'expo';

export class ModalStyled extends React.Component {
  state = {
    category: { name: '' },
    location:{
      name: '',
      address: '',
      coordinates: {latitude: '', longitude: ''},
      category: '',
    },
    userLocation: null,
  }

  componentDidMount = () => {
    const { action, type, currentItem } = this.props;
    if(action === 'Edit' && type === Types.CATEGORIES)
      this.setState({category: currentItem || ''})
    if(type === Types.LOCATIONS){
      if(action === 'Edit'){
        const userLocation = {
          latitude: Number(currentItem.coordinates.latitude),
          longitude: Number(currentItem.coordinates.longitude)
        }
        this.setState({location: currentItem || '', userLocation})
      }
      else
        this._getLocationAsync();
    }
  }
  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted'){
      Toast.show('location permissin error')
      this.props.setModalVisible();
    }
    const providerStatus = await Location.getProviderStatusAsync()
    if(providerStatus.locationServicesEnabled){
      const location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      const userLocation = {
        latitude: location.coords.latitude, 
        longitude: location.coords.longitude
      }
      this.setState(prevState => ({
        userLocation,
        location: {...prevState.location,
          coordinates: { ...prevState.location.coordinates, ...userLocation}}
        }))
    }
    else{
      Toast.show('Please enable location access on your device')
      this.props.setModalVisible();
    }
  };

  canAction = () => {
    switch(this.props.type) {
      case Types.CATEGORIES:
        return this.state.category['name'] == '';
      case Types.LOCATIONS:
        const {location} = this.state;
        return location['name'] == '' || location['address'] == '';
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
        if(this.state.location['category']==='')
          item['category'] = this.props.categories[0].name;
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
          {this.state.userLocation ?
          <MapView
          style={styles.mapContainer}
          onPress={this.onPressLocation}
          region={{
            ...this.state.userLocation,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
            <MapView.Marker
            coordinate={{...this.state.userLocation}}
            title={"Your Location"}/>
          </MapView>
          : 
          <View style={styles.loadingContainer}>
            <MonoText style={styles.loadingText}>Loading Map...</MonoText>
            <ActivityIndicator size="large" color={BRANDTS.dark} />
          </View>
          }
          </View>
          <View style={styles.coordinates}>
            <MonoText style={styles.subtitle}>Categoty</MonoText>
            <Picker
            style={styles.picker}
            selectedValue={this.state.location['category']}
            onValueChange={item =>{this.setState(prevState => ({location: {...prevState.location, category: item}}))}}>
                {this.props.categories.map(
                  (category,index)=><Picker.Item key={index} label={category.name} value={category.name}/>)}
            </Picker>
          </View>
        </React.Fragment>
        )
      default:
        break;
    }
  }

  onPressLocation = (e) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    this.setState(prevState => ({
      userLocation: { latitude, longitude },
      location: {...prevState.location, 
        coordinates: { ...prevState.location.coordinates, latitude, longitude}}
      }))
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
        <ScrollView>
          <KeyboardAvoidingView style={[styles.container,type===Types.CATEGORIES && styles.smallModal]} behavior="padding">
            <ButtonMono 
            _backgroundColor={'transparent'} 
            _color={BRANDTS.light}
            _fontSize={22}
            _padding={5}
            _text={'X'}
            style={styles.closeButton}
            onClick={setModalVisible}
            disabled={false}/>
            <MonoText style={styles.title}>{action} {type}</MonoText>
            {this.InputsElement()}
            <ButtonMono 
            _backgroundColor={this.canAction() ? BRANDTS.lightSec : BRANDTS.dark} 
            _color={BRANDTS.light}
            _fontSize={18}
            _text={action}
            style={{marginBottom: 10}}
            onClick={() => {this.actionItem();}}
            disabled={this.canAction()}/>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );  
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Layout.window.height * .025,
    width: Layout.window.width * .9,
    backgroundColor: BRANDTS.primary,
    borderColor: BRANDTS.dark,
    borderWidth: 3,
    borderRadius: 10,
  },
  flatview:{
    width: Layout.window.width
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: 'center',
    padding: 10,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 3,
    color: BRANDTS.darkSec,
    marginVertical: 2,
  },
  loadingContainer:{
    justifyContent: 'flex-start',
    height: Layout.window.height * .3,
    width: Layout.window.width * .6,
  },
  loadingText:{
    fontSize: 22,
    textAlign: 'center',
  },
  input:{
    borderBottomWidth: 2,
    width: Layout.window.width * .65,
    height: 35,
    fontSize: 20,
    paddingHorizontal: 5,
    color: BRANDTS.light,
    marginVertical: 5,
  },
  closeButton:{
    position: 'absolute',
    top: 2,
    left: 5,
    paddingHorizontal:10,
  },
  mapContainer:{
    height: Layout.window.height * .3,
    width: Layout.window.width * .65,
  },
  coordinates:{
    marginVertical: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker:{
    marginVertical: 5,
    height: 40, 
    width: 100,
    backgroundColor: 'transparent',
    color: BRANDTS.dark,
  },
  smallModal:{
    height: Layout.window.height * .5, 
    marginTop: Layout.window.height * .1,
  }
  });
  