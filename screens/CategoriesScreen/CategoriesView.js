import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView, Image } from "react-native";
import { MonoText } from '../../components/StyledText';
import { BRANDTS } from "../../constants/Colors";
import Layout from '../../constants/Layout';
import { ModalStyled } from '../../components/StyledModal';

const CategoryItem = (props) => (
    <View style={[styles.categoryItem,{backgroundColor: props.index%2? BRANDTS.lightSec : BRANDTS.light,}]}>
        <View/>
        <MonoText style={styles.categotyText}>{props.item.name}</MonoText>
        <View style={styles.iconsConteiner}>
            <TouchableOpacity onPress={()=>props.editCategoryAction(props.item)}>
                <Image
                source={require('../../assets/images/pencil-case.png')}
                style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.deleteCategoryHandle(props.item)}>
            <Image
                source={require('../../assets/images/trash.png')}
                style={styles.icon}
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
                color: BRANDTS.light,
                borderLeftColor: BRANDTS.lightSec}]}>
                No Categories Found{'\n'}Add by clicking the button above
                </MonoText>
                :
                <ScrollView>
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
                </ScrollView>
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
  categoryItem:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Layout.window.width * .9,
    borderWidth: 4,
    borderRadius: 5,
    borderColor: BRANDTS.dark,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: 'center',
    marginVertical: 20,
  },
  categotyText: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
    color: BRANDTS.dark,
  },
  iconsConteiner:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon:{
    padding: 5,
    height: 40,
    width: 40,
  },
});
