
export const setWeather = (payload) => {
    return {
        type: ACTIONS.SET_WEATHER,
        payload
    }
}

export const addCity = (payload) => {
    return {
        type: ACTIONS.ADD_CITY,
        payload
    }
}

export const setWeatherCity = (payload) => {
    return {
        type: ACTIONS.SET_WEATHER_CITY,
        payload
    }
}

export const setWeatherDay = (payload) => {
    return {
        type: ACTIONS.SET_WEATHER_DAY,
        payload
    }
}


export const reset  = () => {
    return {
        type: ACTIONS.RESET,
    }
}

export const ACTIONS = {
    SET_WEATHER: 'SET_WEATHER',
    ADD_CITY: 'ADD_CITY',
    SET_WEATHER_CITY: 'SET_WEATHER_CITY',
    SET_WEATHER_DAY: 'SET_WEATHER_DAY',

    RESET: 'RESET'
}