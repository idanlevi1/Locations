import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Platform, Vibration, Picker, ScrollView, Image } from "react-native";
import { MonoText } from '../../components/StyledText';
import { BRANDTS } from "../../constants/Colors";
import Layout from '../../constants/Layout';
import { ModalStyled } from '../../components/StyledModal';
import {ModalDetails} from '../../components/DetailsModal';
import groupBy from 'lodash/groupBy';
import { SortTypes } from '../../constants/Enums';

const VIBRATION_DORATION = 1000;

const LocationItem = (props) => (
    <View style={[styles.locationItem,{backgroundColor: props.index%2? BRANDTS.lightSec : BRANDTS.light,}]}>
      <MonoText style={styles.locationText}>{props.item.name}</MonoText>
      <View style={styles.iconsConteiner}>
        <TouchableOpacity onPress={()=>props.onShowModalAction(props.item, 'map')}>
          <Image
          source={require('../../assets/images/navigation.png')}
          style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.onShowModalAction(props.item, 'details')}>
          <Image
          source={require('../../assets/images/question.png')}
          style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.onShowModalAction(props.item, 'edit')}>
          <Image
          source={require('../../assets/images/pencil-case.png')}
          style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.deleteLocationHandle(props.item)}>
          <Image
          source={require('../../assets/images/trash.png')}
          style={styles.icon}
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
    sortListType: SortTypes.ALPHABET_UP,
    groupedByCategory: false,
  };

  componentDidMount = () => {
    this.locationListSort(SortTypes.ALPHABET_UP);
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
      Vibration.vibrate(VIBRATION_DORATION)
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
    if(type === SortTypes.ALPHABET_UP)
      sortedList = this.props.locations.sort((a,b)=>a.name.toLowerCase()>b.name.toLowerCase())
    if(type === SortTypes.ALPHABET_DOWN){
      sortedList = this.props.locations.sort((a,b)=>a.name.toLowerCase()<b.name.toLowerCase())
    }
    this.setState({handledLocationList:sortedList})
  }

  getGroupedLocationsByCategory =() => {
    const groupByCategory = groupBy(this.state.handledLocationList, 'category');
    return Object.keys(groupByCategory).map(category=> 
      <React.Fragment key={category}>
        <MonoText style={styles.groupTitle}>{category}</MonoText>
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
            color: BRANDTS.light,
            borderLeftColor: BRANDTS.lightSec}]}>
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
                  <Picker.Item key={SortTypes.ALPHABET_UP} label={SortTypes.ALPHABET_UP} value={SortTypes.ALPHABET_UP}/>
                  <Picker.Item key={SortTypes.ALPHABET_DOWN} label={SortTypes.ALPHABET_DOWN} value={SortTypes.ALPHABET_DOWN}/>
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  locationItem:{
    width: Layout.window.width * .9,
    borderWidth: 4,
    borderRadius: 5,
    borderColor: BRANDTS.dark,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 10,
    color: BRANDTS.dark,
  },
  iconsConteiner:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon:{
    padding: 5,
    height: 40,
    width: 40,
  },
  groupTitle:{
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal:2,
    color: BRANDTS.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal:2,
  },
  picker:{ 
    height: 50, 
    width: 50,
    backgroundColor: '#FFF',
    color: BRANDTS.primarySec,
    padding: 5,
  },
});
