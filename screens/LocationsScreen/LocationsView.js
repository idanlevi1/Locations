import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Platform, Vibration, Picker, ScrollView } from "react-native";
import { MonoText } from '../../components/StyledText';
import { BRANDTS } from "../../constants/Colors";
import Layout from '../../constants/Layout';
import { ModalStyled } from '../../components/StyledModal';
import { Ionicons } from '@expo/vector-icons';
import {ModalDetails} from '../../components/DetailsModal';
import groupBy from 'lodash/groupBy';

const DURATION = 1000;

const LocationItem = (props) => (
    <View style={[styles.flatview,{backgroundColor: props.index%2? BRANDTS.four : BRANDTS.three,}]}>
      <View style={styles.iconsConteiner}>
        <TouchableOpacity onPress={()=>props.onShowModalAction(props.item, 'map')}>
          <Ionicons
          name={Platform.OS === "ios" ? "ios-navigate" : "md-navigate"}
          size={35}
          color={BRANDTS.one}
          style={{paddingRight:7.5}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.onShowModalAction(props.item, 'details')}>
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
        <TouchableOpacity onPress={()=>props.onShowModalAction(props.item, 'edit')}>
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
  state={ 
    modalActionVisible: false, 
    currentItem: null, 
    modalDetailsVisible: false,
    modalType: null,
    handledLocationList: [],
    sortListType: 'A-Z',
    groupedByCategory: false,
  };

  componentDidMount = () => {
    this.locationListSort('A-Z');
  }

  componentDidUpdate(prevProps){
    if(prevProps.locations !== this.props.locations)
      this.locationListSort(this.state.sortListType);
  }
  
  setModalActionVisibleHandle = () => {
      this.setState({modalActionVisible: !this.state.modalActionVisible})
  }

  setmodalDetailsVisibleHandle = () => {
    this.setState({modalDetailsVisible: !this.state.modalDetailsVisible})
  }

  showModalAction = (item,type) => {
    if(type === 'edit')
      this.setModalActionVisibleHandle();
    else{
      Vibration.vibrate(DURATION)
      this.setState({modalType: type});
      this.setmodalDetailsVisibleHandle();
    }
    this.setState({currentItem: item})
  }
  
  onEditLocationAction = (newItem) => {
      this.props.editLocationHandle(this.state.currentItem,newItem)
  }

  locationListSort = (type) => {
    let sortedList = this.props.locations;
    if(type === 'A-Z')
      sortedList = this.props.locations.sort((a,b)=>a.name.toLowerCase()>b.name.toLowerCase())
    if(type === 'Z-A'){
      sortedList = this.props.locations.sort((a,b)=>a.name.toLowerCase()<b.name.toLowerCase())
    }
    this.setState({handledLocationList:sortedList})
  }

  getGroupedLocationsByCategory =() => {
    const groupByCategory = groupBy(this.state.handledLocationList, 'category');
    return Object.keys(groupByCategory).map(category=> 
      <React.Fragment key={category}>
        <MonoText style={styles.subtitle}>{category}</MonoText>
        <FlatList
        data={groupByCategory[category]}
        extraData={this.state}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item,index}) =>
          <LocationItem 
          item={item} 
          index ={index}
          deleteLocationHandle={this.props.deleteLocationHandle}
          onShowModalAction={this.showModalAction}/>}/>  
      </React.Fragment>
      )
  }

  render() {
    const {locations, deleteLocationHandle, categories} = this.props;
    return (
        <View style={styles.container}>
            { locations.length === 0 ? <MonoText style={[styles.subtitle,{
            paddingVertical:20,
            color: BRANDTS.three,
            borderLeftColor: BRANDTS.four}]}>
            No Locations Found{'\n'}Add by clicking the button above
            </MonoText>
            :
            <React.Fragment>
              <View style={styles.filtersLine}>
                <MonoText style={styles.subtitle}>Sort By</MonoText>
                <Picker
                style={styles.picker}
                selectedValue={this.state.sortListType}
                onValueChange={value => {this.setState({sortListType:value}); this.locationListSort(value)}}>
                  <Picker.Item key={'A-Z'} label={'A-Z'} value={'A-Z'}/>
                  <Picker.Item key={'Z-A'} label={'Z-A'} value={'Z-A'}/>
                </Picker>
                <MonoText style={styles.subtitle}>Group BY Category</MonoText>
                <Picker
                style={styles.picker}
                selectedValue={this.state.groupedByCategory}
                onValueChange={value => {this.setState({groupedByCategory:value})}}>
                  <Picker.Item key={'Yes'} label={'Yes'} value={true}/>
                  <Picker.Item key={'No'} label={'No'} value={false}/>
                </Picker>
              </View>
              <ScrollView>
                { !this.state.groupedByCategory ?
                <FlatList
                data={this.state.handledLocationList}
                extraData={this.state}
                keyExtractor={item => item.name}
                renderItem={({item,index}) =>
                  <LocationItem 
                  item={item} 
                  index ={index}
                  deleteLocationHandle={deleteLocationHandle}
                  onShowModalAction={this.showModalAction}/>
                }
                />
                :
                this.getGroupedLocationsByCategory()
                }
              </ScrollView>
            </React.Fragment>
            }
            {this.state.modalActionVisible &&
            <ModalStyled 
            modalVisible={this.state.modalActionVisible} 
            type={'Locations'}
            action={'Edit'}
            categories={categories}
            setModalVisible={this.setModalActionVisibleHandle}
            onActionItem={this.onEditLocationAction}
            currentItem={this.state.currentItem}/>
            }
            { this.state.modalDetailsVisible &&
            <ModalDetails
            type={this.state.modalType}
            modalVisible={this.state.modalDetailsVisible}
            setModalVisible={this.setmodalDetailsVisibleHandle}
            location={this.state.currentItem}
            />
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
  filtersLine:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BRANDTS.four,
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
    marginVertical: 5,
    paddingHorizontal:2,
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
  picker:{ 
    height: 50, 
    width: 50,
    backgroundColor: BRANDTS.one,
    color: BRANDTS.two,
    borderRadius:15,
    borderWidth:1,
  },
});
