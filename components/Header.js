import React from "react";
import { TouchableOpacity, View, Platform, StyleSheet } from "react-native";
import { MonoText } from "../components/StyledText";
import { BRANDTS } from "../constants/Colors";
import { Constants } from "expo";
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { Types } from '../constants/Enums';
import {ModalStyled} from './StyledModal';
import { connect } from 'react-redux';
import {addCategory} from '../store/modules/categories/categoriesActions';
import {addLocation} from '../store/modules/locations/locationsActions';
import Toast from 'react-native-simple-toast';

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
        <View style={styles.container}>
        {backOption ? 
          <TouchableOpacity onPress={navigation.goBack()}>
              <MonoText style={{ color: BRANDTS.one, fontSize: 18 }}>
              Back
              </MonoText>
          </TouchableOpacity>
          :
          <View/>
        }
          <MonoText style={styles.title}>{title}</MonoText>
          {addIcon && 
          <TouchableOpacity onPress={this.setModalVisibleHandle}>
            <Ionicons
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
            size={45}
            style={{}}
            color={BRANDTS.one}
            />
          </TouchableOpacity>
          }
        </View>
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
  backgroundColor: BRANDTS.two,
  paddingVertical: 5,
  paddingHorizontal: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: Layout.window.height * 0.1
  },
  statusBar:{
    backgroundColor: BRANDTS.two,
    height: Constants.statusBarHeight
  },
  title:{ 
    color: BRANDTS.one, 
    fontSize: 26 
  },
});