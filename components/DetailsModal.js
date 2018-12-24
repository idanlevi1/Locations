import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { MonoText } from './StyledText';
import Layout from '../constants/Layout';
import { BRANDTS } from "../constants/Colors";
import { ButtonMono } from './StyledButton';
import MapView,{Marker} from 'react-native-maps';

export class ModalDetails extends React.Component {
  render() {
    const { modalVisible, location, setModalVisible, type } = this.props;
    const coordinates = {
        latitude: Number(location.coordinates.latitude),
        longitude: Number(location.coordinates.longitude)
    }
    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
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
            <MonoText style={styles.title}>{location.name}</MonoText>
            <MonoText style={styles.subtitle}>Address:{location.address}</MonoText>
            {type === 'map' ?
            <MapView
            style={styles.mapContainer}
            initialRegion={{
            ...coordinates,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
            }}>
                <Marker
                coordinate={coordinates}
                title={location.name}
                description={location.address}
                />
            </MapView>
            :
            <React.Fragment>
                <MonoText style={styles.subtitle}>Category: {location.category}</MonoText>
                <MonoText style={styles.title}>Coordinates</MonoText>
                <MonoText style={styles.subtitle}>latitude: {location.coordinates.latitude}, longitude: {location.coordinates.longitude}</MonoText>
            </React.Fragment>    
            }
        </View>
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
    marginTop: Layout.window.height * .2,
    height: Layout.window.height * .65,
    width: Layout.window.width * .8,
    backgroundColor: BRANDTS.two,
    borderWidth: 3,
    borderColor: BRANDTS.four,
    borderRadius: 10,
  },
  mapContainer:{
    height: Layout.window.height * .4,
    width: Layout.window.width * .65,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: 'center',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    color: BRANDTS.one,
    marginVertical: 2,
  },
  closeButton:{
    position: 'absolute',
    top: 5,
    left: 5,
  },
  });
  