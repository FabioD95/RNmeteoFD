import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, ActivityIndicator, FlatList, Animated } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';
import {setWeatherCity} from '../store/actions'


export default function cityList() {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const {weather} = useSelector((state) => state.reducer)
    const {myCity} = useSelector((state) => state.reducer)
    const weatherList = weather.slice(0, myCity.length)
    
    var currentDate = {date: 0, month: 0, year: 0, hours: 0, min: 0}
        currentDate.date = new Date().getDate(); //Current Date
        currentDate.month = new Date().getMonth() + 1; //Current Month
        currentDate.year = new Date().getFullYear(); //Current Year
        currentDate.hours = new Date().getHours(); //Current Hours
        currentDate.min = new Date().getMinutes(); //Current Minutes


    const renderItem = ({ item, index }) => {
    const iconCode = item.list[0].weather[0].icon
    const iconApi = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    const dayWeek = new Date(item.list[0].dt_txt).getDay()
    const dayName = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const monthName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    //const timeZone = item.city.timezone / 3600 - 1

    return (
        <TouchableOpacity onPress={() => {navigation.navigate('CityWeather'); dispatch(setWeatherCity(index))}}>
            <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                    <Text>{item.city.name}</Text>
                    <Text>{dayName[dayWeek - 1]} {currentDate.date},</Text>
                    <Text>{monthName[currentDate.month]}</Text>
                    <Text>{currentDate.hours}: {currentDate.min}</Text>
                </View>
                <View style={styles.itemCenter}>
                    <Image source={{uri: iconApi}} style={{width:50, height:50}}/>
                </View>
                <View style={styles.itemRight}>
                    <Text>{String(item.list[0].main.temp - 273.15).slice(0, 2)}°</Text>
                </View>
            </View>
      </TouchableOpacity>
    );
  };

  return (
      <FlatList
        data={weatherList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        //extraData={selectedId}
        //bounces={false}
        style={styles.containerList}
      />
  );
};

const { width, height } = Dimensions.get('window');
const itemWidth = width * 0.90
const itemHeight = height * 0.16
const itemMargin = height * 0.012
const containerListHeight = (itemHeight + (itemMargin * 2)) * 3

const styles = StyleSheet.create({
    containerList: {
        flexGrow: 0,
        height: containerListHeight,
    },
    itemContainer: {
        borderWidth: 1,
        height: itemHeight,
        width: itemWidth,
        borderRadius: 25,
        marginVertical: itemMargin,
        //elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(126, 139, 157, 0.8)',
    },
    itemLeft: {
        borderWidth: 1,
        marginLeft: itemMargin,
    },
    itemCenter: {
        borderWidth: 1,
    },
    itemRight: {
        borderWidth: 1,
        marginRight: itemMargin,
    }
});

