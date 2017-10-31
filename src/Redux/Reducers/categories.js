import * as actionTypes from "../Constants/actionTypes";
const initialState = {
    CategoriesNames: ['aaa','ccc','ddd'],
    Locations: [
        {
            catName: 'aaa',
            locations: [{
                name: 'Ashdod',
                Address: 'Chevet Rehuven 3/58',
                long: 31.123,
                lat: 32.132
            }]
        }
    ]
};

export const categories = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_NEW_CATEGORY:{
            const newArr = [...state.CategoriesNames , action.payload.category];
            const newState = {...state , CategoriesNames: newArr};
            return newState;
        }
        case actionTypes.EDIT_CATEGORY: {
            const newArr = state.CategoriesNames.map( (name) => name === action.payload.oldName ? action.payload.newName : name );
            return {...state, CategoriesNames: newArr};
        }


        default: {
            return state;
        }

    }
}

