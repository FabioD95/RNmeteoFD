import {ACTIONS} from './actions'

const initialState = {
    weather: [],
    myCity: [ 'nuoro', 'padova', 'aosta' ],
    weatherCity: 0,
    weatherDay: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_WEATHER:
            return {...state, weather: [action.payload, ...state.weather]}
        
        case ACTIONS.SET_WEATHER_CITY:
            return {...state, weatherCity: action.payload}

        case ACTIONS.SET_WEATHER_DAY:
            return {...state, weatherDay: action.payload}


        case ACTIONS.RESET:
            return initialState;
        default:
            return state
    }
}

export default reducer