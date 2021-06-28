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

const editWeatherPage = {  //sample to prevent error when edit
    city: {name: 'Nuoro'},
    list: [{dt_txt: "2021-06-26 21:00:00", main: {temp: 297.7}, weather: [{description: "pioggia leggera", icon: "10d"}]}, {dt_txt: "2021-06-26 21:00:00", main: {temp: 297.7}, weather: [{description: "pioggia leggera", icon: "10d"}]}, {dt_txt: "2021-06-26 21:00:00", main: {temp: 297.7}, weather: [{description: "pioggia leggera", icon: "10d"}]},]
}