import * as actionTypes from "../Constants/actionTypes";

const initialState = {
    // CategoriesNames: ['aaa', 'ccc', 'ddd'],
    Locations: [
        {
            catName: 'aaa',
            locations: [
                {
                    name: 'Ashdod',
                    address: 'Chevet Rehuven 3/58',
                    long: 34.635831,
                    lat: 31.778561
                },
                {
                    name: 'Tel Aviv',
                    address: 'Hamelech Eliakim 3/4',
                    long: 34.781520,
                    lat: 32.062719
                },
                {
                    name: 'Eilat',
                    address: 'Harakefet 4',
                    long: 34.956694,
                    lat: 29.551765
                }]
        }
    ]
};

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_CATEGORY: {
            const newArr = [...state.Locations, {catName: action.payload.category, locations: []}];
            // const newState = {...state, CategoriesNames: newArr};
            const newState = {Locations: newArr}
            return newState;
        }
        case actionTypes.EDIT_CATEGORY: {
            const newArr1 = state.Locations.map((loca) => loca.catName === action.payload.oldName ? {
                ...loca,
                catName: action.payload.newName
            } : loca);
            const newState1 = {Locations: newArr1}
            return newState1;
        }
        case actionTypes.ADD_LOCATION:

            const newArr2 = action.payload.location.cats.map((option) => {
                state.Locations.map((loca) => option.value === loca.catName ? {
                    catName: loca.catName,
                    locations: [...loca, {
                                name: action.payload.location.name,
                                address: action.payload.location.address,
                                lat: action.payload.location.lat,
                                long: action.payload.location.long
                    } ]
                } : loca)
                    // state.Locations.map((loca) => option.value === loca.catName ? ({
                    //     catName: loca.catName,
                    //     locations: [{
                    //         name: action.payload.location.name,
                    //         address: action.payload.location.address,
                    //         lat: action.payload.location.lat,
                    //         long: action.payload.location.long
                    //     }]
                    // }) : loca);
                })
            debugger

            const newState2 = {Locations: newArr2};
            return newState2;



        default: {
            return state;
        }

    }
}

