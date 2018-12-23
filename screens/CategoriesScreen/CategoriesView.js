import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Platform } from "react-native";
import { MonoText } from '../../components/StyledText';
import { BRANDTS } from "../../constants/Colors";
import Layout from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { ModalStyled } from '../../components/StyledModal';

const CategoryItem = (props) => (
    <View style={[styles.flatview,{backgroundColor: props.index%2? BRANDTS.four : BRANDTS.three,}]}>
        <View/>
        <MonoText style={styles.categotyText}>
        {props.item.name}
        </MonoText>
        <View style={styles.iconsConteiner}>
            <TouchableOpacity onPress={()=>props.editCategoryAction(props.item)}>
                <Ionicons
                name={Platform.OS === "ios" ? "ios-create" : "md-create"}
                size={35}
                color={BRANDTS.one}
                style={{paddingRight:7.5}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.deleteCategoryHandle(props.item)}>
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

class CategoriesView extends React.Component {
    state={ modalVisible: false, currentItem: null };

    setModalVisibleHandle = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    editCategoryShow = (item) => {
        this.setModalVisibleHandle();
        this.setState({currentItem: item});
    }

    onEditCategoryAction = (newItem) => {
        this.props.editCategoryHandle(this.state.currentItem,newItem)
    }

    render() {
        const {categories, deleteCategoryHandle} = this.props;
        return (
            <View style={styles.container}>
                { categories.length === 0 ? <MonoText style={[styles.subtitle,{
                color: BRANDTS.three,
                borderLeftColor: BRANDTS.four}]}>
                No Categories Found{'\n'}Add by clicking the button above
                </MonoText>
                :
                <FlatList
                data={categories}
                keyExtractor={item => item.name}
                renderItem={({item,index}) =>
                    <CategoryItem 
                    item={item} 
                    index ={index} 
                    deleteCategoryHandle={deleteCategoryHandle}
                    editCategoryAction={this.editCategoryShow}/>
                }
                />
                }
                {this.state.modalVisible &&
                <ModalStyled 
                modalVisible={this.state.modalVisible} 
                type={'Categories'}
                action={'Edit'}
                setModalVisible={this.setModalVisibleHandle}
                onActionItem={this.onEditCategoryAction}
                currentItem={this.state.currentItem}/>
                }
            </View>
        );
  }
}

export default CategoriesView;

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
  categotyText: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: 'center',
    color: BRANDTS.two,
  },
  iconsConteiner:{
    flexDirection: 'row',
  },
});
