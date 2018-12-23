import React from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import CategoriesView from './CategoriesView';
import { deleteCategory, editCategory } from '../../store/modules/categories/categoriesActions';

class Categories extends React.Component {
  static navigationOptions = {
    header: <Header title={'Categories'} addIcon={true}/>,
  };

  deleteCategoryHandle = (element) => {
    let elementIndex = this.props.categories.findIndex((category) => category.name === element.name)
    this.props.onDeleteCategory(elementIndex);
  }

  editCategoryHandle = (oldItem,NewItem) => {
    let itemIndex = this.props.categories.findIndex((category) => category.name === oldItem.name)
    console.log('editCategoryHandle',itemIndex, NewItem)
    this.props.onEditCategory(itemIndex,NewItem);
  }

  render() {
    return (
      <CategoriesView 
      categories={this.props.categories}
      deleteCategoryHandle={this.deleteCategoryHandle}
      editCategoryHandle={this.editCategoryHandle}/>
    );
  }
}

const mapStateToProps = state => {
  console.log('mapState[categories]:', state.categories.categories)
  return {
      categories: state.categories.categories,
  }
}

const mapActionsToProps = {
  onDeleteCategory: deleteCategory,
  onEditCategory: editCategory
}

export default connect(mapStateToProps,mapActionsToProps)(Categories);
