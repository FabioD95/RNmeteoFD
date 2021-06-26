import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import TabNavigation from '../components/tabNavigation'
import { Feather } from '@expo/vector-icons';
import {colors} from '../components/color'
import {setWeather} from '../store/actions'


export default function topCityView() {
    const {weather} = useSelector((state) => state.reducer)
    const {weatherCity} = useSelector((state) => state.reducer)
    const DATA = weather[weatherCity]
    //console.log(DATA)

    var currentDate = {date: 0, month: 0, year: 0, hours: 0, min: 0}
        currentDate.date = new Date().getDate(); //Current Date
        currentDate.month = new Date().getMonth() + 1; //Current Month
        currentDate.year = new Date().getFullYear(); //Current Year
        currentDate.hours = new Date().getHours(); //Current Hours
        currentDate.min = new Date().getMinutes(); //Current Minutes

    const iconCode = DATA.list[0].weather[0].icon
    const iconApi = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    const dayWeek = new Date(DATA.list[0].dt_txt).getDay()
    const dayName = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const monthName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

    return(
        <View style={styles.container} >
            <Text>{DATA.city.name}</Text>
            <Text>{dayName[dayWeek]}, {dayWeek}, {monthName[currentDate.month]}</Text>
            <Text>{DATA.list[0].weather[0].description}</Text>
            <Image source={{uri: iconApi}} style={{width:50, height:50}}/>
            <Text>{String(DATA.list[0].main.temp - 273.15).slice(0, 2)}°</Text>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const TabNavigationHeight = height * 0.093
const TabNavigationMarginBottom = height * 0.022
const cityListMarginBottom = TabNavigationHeight + TabNavigationMarginBottom 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'space-around',
        borderWidth: 1,
    },
})