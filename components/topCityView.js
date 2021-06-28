import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import TabNavigation from '../components/tabNavigation'
import { Feather, AntDesign } from '@expo/vector-icons';
import {colors} from '../components/color'
import {setWeather} from '../store/actions'
import { useNavigation } from '@react-navigation/native';


export default function topCityView() {
    const {weather} = useSelector((state) => state.reducer)
    const {weatherCity} = useSelector((state) => state.reducer)
    const DATA = weather[weatherCity]
    //console.log(weather)
    //console.log(new Date((DATA.list[0].dt_txt).slice(0, 10)).getDay())
    const navigation = useNavigation();

    var currentDate = {date: 0, month: 0, year: 0, hours: 0, min: 0}
        currentDate.date = new Date().getDate(); //Current Date
        currentDate.month = new Date().getMonth() + 1; //Current Month
        currentDate.year = new Date().getFullYear(); //Current Year
        currentDate.hours = new Date().getHours(); //Current Hours
        currentDate.min = new Date().getMinutes(); //Current Minutes

    const iconCode = DATA.list[0].weather[0].icon
    const iconApi = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    const dayWeek = new Date((DATA.list[0].dt_txt).slice(0, 10)).getDay()
    const dayName = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const monthName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

    return(
        <View style={styles.container} >
            <View style={styles.topContainer}>
                <AntDesign name="arrowleft" size={30} color="white" onPress={() => {navigation.navigate('Home')}}/>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>{DATA.city.name}</Text>
                <Feather name="plus-square" size={30} color='white' onPress={() => {navigation.navigate('SearchCity')}}/>
            </View>
            
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{dayName[dayWeek]}, {dayWeek}, {monthName[currentDate.month]}</Text>

            <Text style={{fontSize: 15, fontWeight: 'normal', color: 'white'}}>{DATA.list[0].weather[0].description}</Text>

                <View style={styles.iconBox}>
                    <Image source={{uri: iconApi}} style={{width: 120, height: 120}}/>
                    <Text style={{fontSize: 80, fontWeight: 'bold', color: 'white'}}>{String(DATA.list[0].main.temp - 273.15).slice(0, 2)}°</Text>
                </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const TabNavigationHeight = height * 0.093
const TabNavigationMarginBottom = height * 0.022
const cityListMarginBottom = TabNavigationHeight + TabNavigationMarginBottom 
const marginHorizontal = width * 0.05

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'space-around',
        //borderWidth: 1,
        width: width,
        height: (height - (height * 0.115)) / 3,
        //marginTop: Platform.OS == 'ios' ? TabNavigationMarginBottom + 30 : TabNavigationMarginBottom
    },
    iconBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
    },
    topContainer: {
        //borderWidth: 1, 
        flexDirection: 'row', 
        width: width - (marginHorizontal * 2), 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})