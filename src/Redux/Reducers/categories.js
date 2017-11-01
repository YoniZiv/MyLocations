import * as actionTypes from "../Constants/actionTypes";

const initialState = {
    categories: ['aaa','bbb']
}

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_CATEGORY: {
            const newArr ={categories: [...state.categories, action.payload.category ]} ;
            debugger
            // const newState = {...state, CategoriesNames: newArr};
            // const newState = {Locations: newArr}
            return newArr;
        }
        case actionTypes.EDIT_CATEGORY: {
            const newArr1 = state.categories.map((cat) => cat === action.payload.oldName ? action.payload.newName : cat);
            const newState1 = {categories: newArr1}
            return newState1;
        }

        default: {
            return state;
        }

    }
}

