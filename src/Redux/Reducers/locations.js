import * as actionTypes from "../Constants/actionTypes";
import {msgSaveLocation} from "../Constants/growlMessages";
import * as _ from "lodash";

const initialState = {
    locations: [
        {
            category: 'aaa',
            name: 'Ashdod',
            address: 'Chevet Rehuven 3/58',
            long: 34.635831,
            lat: 31.778561
        },
        {
            category: 'bbb',
            name: 'Tel Aviv',
            address: 'Hamelech Eliakim 3/4',
            long: 34.781520,
            lat: 32.062719
        },
        {
            category: 'aaa',
            name: 'Eilat',
            address: 'Harakefet 4',
            long: 34.956694,
            lat: 29.551765
        }]
};


export const locations = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_LOCATION: {
            console.log(action.payload)
            const newArr3 = [...state.locations, ...action.payload.location.cats.map((cat) => (
                {
                        category: cat.value,
                        name: action.payload.location.name,
                        address: action.payload.location.address,
                        long: action.payload.location.long,
                        lat: action.payload.location.lat
                }
            ))]
            const newState = {locations: newArr3}
            return newState;
        }
        case actionTypes.EDIT_LOCATION:{
            console.log('works edit', action.payload.name, action.payload.address);
        }

        case actionTypes.DELETE_ALL_FROM_CATEGORY: {
            const newArr4 = state.locations.filter((location) => (
                location.category !== action.payload.name
            ))
            return {locations: newArr4}
        }

        case actionTypes.DELETE_LOCATION:
            let clonedArray = state.locations.map((loc) => loc)
            // let locationsArr = clonedArray.filter((loc) => {  loc.name === action.payload.locName && loc.category === action.payload.catName})
            _.remove(clonedArray, (loc) =>  loc.category === action.payload.catName && loc.name === action.payload.locName );
            return {locations: clonedArray};


        default: {
            return state
        }

    }
}
