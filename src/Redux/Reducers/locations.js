import * as actionTypes from "../Constants/actionTypes";

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
            debugger
            return newState;
            // const newArr2 = action.payload.location.cats.map((option) => {
            //     state.Locations.map((loca) => option.value === loca.catName ? {
            //         catName: loca.catName,
            //         locations: [...loca, {
            //             name: action.payload.location.name,
            //             address: action.payload.location.address,
            //             lat: action.payload.location.lat,
            //             long: action.payload.location.long
            //         }]
            //     } : loca)
            //     // state.Locations.map((loca) => option.value === loca.catName ? ({
            //     //     catName: loca.catName,
            //     //     locations: [{
            //     //         name: action.payload.location.name,
            //     //         address: action.payload.location.address,
            //     //         lat: action.payload.location.lat,
            //     //         long: action.payload.location.long
            //     //     }]
            //     // }) : loca);
            // })
            // debugger
            //
            // const newState2 = {Locations: newArr2};
            // return newState2;
        }
        default: {
            return state
        }

    }
}
