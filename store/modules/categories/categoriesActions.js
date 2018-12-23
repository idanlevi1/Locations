export const SET_CATEGORIES = 'categories:setCategories';
export const ADD_CATEGORY = 'categories:addCategory';
export const EDIT_CATEGORY = 'categories:editCategory';
export const DELETE_CATEGORY = 'categories:deleteCategory';

export const setCategories = categoriesData => ({
    type: SET_CATEGORIES,
    payload: categoriesData
});

export const addCategory = category => ({
    type: ADD_CATEGORY,
    payload: category
});

export const editCategory = (index,newCategory) => ({
    type: EDIT_CATEGORY,
    payload: { index: index, newCategory: newCategory}
});

export const deleteCategory = index => ({
    type: DELETE_CATEGORY,
    payload: index
});