import React from "react";
import { TouchableOpacity, View, Platform, StyleSheet, Image } from "react-native";
import { Constants, LinearGradient } from "expo";
import { connect } from 'react-redux';
import {addCategory} from '../store/modules/categories/categoriesActions';
import {addLocation} from '../store/modules/locations/locationsActions';
import { MonoText } from "../components/StyledText";
import Toast from 'react-native-simple-toast';
import {ModalStyled} from './StyledModal';
import { BRANDTS } from "../constants/Colors";
import Layout from '../constants/Layout';
import { Types } from '../constants/Enums';

class Header extends React.Component {
  state={ modalVisible: false };

  setModalVisibleHandle = () => {
    if(this.props.title === Types.LOCATIONS && this.props.categories.length === 0)
      Toast.show('You have to add category first!')
    else 
      this.setState({modalVisible: !this.state.modalVisible})
  }

  onAddItem = (item) => {
    switch(this.props.title) {
      case Types.CATEGORIES:
        this.props.onAddCategory(item);
        break;
      case Types.LOCATIONS:
        this.props.onAddLocation(item);
        break;
      default:
        return false;
    }
  }

  render() {
    const { title, addIcon, backOption, navigation, categories } = this.props;
    return (
      <View>
        <View style={styles.statusBar}/>
        <LinearGradient
        colors={[BRANDTS.primary, BRANDTS.primarySec, BRANDTS.light]}
        style={styles.container}
        start={[0, 0]}
        end={[1, .75]}
        >
          {backOption ? 
          <TouchableOpacity onPress={navigation.goBack()}>
            <MonoText style={{ color: BRANDTS.dark, fontSize: 18 }}>Back</MonoText>
          </TouchableOpacity>
          :
          <View/>
          }
          <MonoText style={styles.title}>{title}</MonoText>
          {addIcon && 
            <TouchableOpacity onPress={this.setModalVisibleHandle}>
            <Image
            source={require('../assets/images/add-item.png')}
            style={styles.icon}
            />
          </TouchableOpacity>
          }
          </LinearGradient>
        {this.state.modalVisible &&
        <ModalStyled
        modalVisible={this.state.modalVisible} 
        type={title}
        action={'Add'}
        setModalVisible={this.setModalVisibleHandle}
        onActionItem={this.onAddItem}
        categories={categories}/>
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  }
}

const mapActionsToProps = {
    onAddCategory: addCategory,
    onAddLocation: addLocation,
};

export default connect(mapStateToProps,mapActionsToProps)(Header)

const styles = StyleSheet.create({
  container: {
  backgroundColor: BRANDTS.primary,
  paddingVertical: 5,
  paddingHorizontal: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: Layout.window.height * 0.1,
  borderBottomWidth: 2,
  borderBottomColor: BRANDTS.lightSec,
  },
  statusBar:{
    backgroundColor: BRANDTS.primarySec,
    height: Constants.statusBarHeight
  },
  title:{ 
    color: BRANDTS.darkSec, 
    fontSize: 26 
  },
  icon:{
    padding: 5,
    height: 45,
    width: 45,
    marginHorizontal: 3,
  },
});