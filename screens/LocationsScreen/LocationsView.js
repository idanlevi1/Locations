import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Platform  } from "react-native";
import { MonoText } from '../../components/StyledText';
import { BRANDTS } from "../../constants/Colors";
import Layout from '../../constants/Layout';
import { ModalStyled } from '../../components/StyledModal';
import { Ionicons } from '@expo/vector-icons';

const LocationItem = (props) => (
    <View style={[styles.flatview,{backgroundColor: props.index%2? BRANDTS.four : BRANDTS.three,}]}>
      <View style={styles.iconsConteiner}>
        <TouchableOpacity onPress={()=>props.onEditLocationShow(props.item)}>
          <Ionicons
          name={Platform.OS === "ios" ? "ios-navigate" : "md-navigate"}
          size={35}
          color={BRANDTS.one}
          style={{paddingRight:7.5}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.onEditLocationShow(props.item)}>
          <Ionicons
          name={Platform.OS === "ios" ? "ios-information-circle" : "md-information-circle"}
          size={35}
          color={BRANDTS.one}
          style={{paddingLeft: 7.5}}
          />
        </TouchableOpacity>
      </View>
      <MonoText style={styles.locationText}>{props.item.name}</MonoText>
      <View style={styles.iconsConteiner}>
        <TouchableOpacity onPress={()=>props.onEditLocationShow(props.item)}>
          <Ionicons
          name={Platform.OS === "ios" ? "ios-create" : "md-create"}
          size={35}
          color={BRANDTS.one}
          style={{paddingRight:7.5}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.deleteLocationHandle(props.item)}>
          <Ionicons
          name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
          size={35}
          color={BRANDTS.one}
          style={{paddingLeft: 7.5}}
          />
        </TouchableOpacity>
      </View>
    </View>
)

class LocationsView extends React.Component {
  state={ modalVisible: false, currentItem: null };

  setModalVisibleHandle = () => {
      this.setState({modalVisible: !this.state.modalVisible})
  }

  editLocationShow = (item) => {
    this.setModalVisibleHandle();
    this.setState({currentItem: item})
  }

  onEditLocationAction = (newItem) => {
      this.props.editLocationHandle(this.state.currentItem,newItem)
  }
  render() {
    const {locations, deleteLocationHandle} = this.props;
    console.log('[render] locations', locations)
    return (
        <View style={styles.container}>
            { locations.length === 0 ? <MonoText style={[styles.subtitle,{
            color: BRANDTS.three,
            borderLeftColor: BRANDTS.four}]}>
            No Locations Found{'\n'}Add by clicking the button above
            </MonoText>
            :
            <FlatList
            data={locations}
            renderItem={({item,index}) =>
              <LocationItem 
              item={item} 
              index ={index} 
              deleteLocationHandle={deleteLocationHandle}
              onEditLocationShow={this.editLocationShow}/>
            }
            keyExtractor={item => item.name}
            />
            }
            {this.state.modalVisible &&
            <ModalStyled 
            modalVisible={this.state.modalVisible} 
            type={'Locations'}
            action={'Edit'}
            setModalVisible={this.setModalVisibleHandle}
            onActionItem={this.onEditLocationAction}
            currentItem={this.state.currentItem}/>
            }
        </View>
    );
}
}

export default LocationsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginVertical: 5
  },
  flatview:{
    width: Layout.window.width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderLeftWidth: 10,
    borderLeftColor: BRANDTS.one,
    borderRightWidth: 10,
    borderRightColor: BRANDTS.one,
    paddingVertical: 10,
    paddingHorizontal: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: 'center',
    marginVertical: 20,
  },
  locationText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center',
    color: BRANDTS.two,
  },
  iconsConteiner:{
    flexDirection: 'row',
  },
});
