import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, ActivityIndicator, FlatList, Animated, ImageBackground } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';
import {setWeatherCity} from '../store/actions'
import {backImage} from '../components/backImage';


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
    const dayWeek = new Date((item.list[0].dt_txt).slice(0, 10)).getDay()
    const dayName = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const monthName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    //const timeZone = item.city.timezone / 3600 - 1
    
    const back_image = backImage(iconCode)
    return (
        
        <TouchableOpacity onPress={() => {navigation.navigate('CityWeather'); dispatch(setWeatherCity(index))}}>
        
            <View style={styles.itemContainer}>
                <ImageBackground source={back_image} style={{width: '100%', borderRadius: 25,}} blurRadius={10} >
                    <View style={styles.itemContainer2}>

                    <View style={styles.itemLeft}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>{item.city.name}</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>{dayName[dayWeek]} {currentDate.date},</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>{monthName[currentDate.month]}</Text>
                        <Text style={{fontSize: 10, fontWeight: 'normal', color: 'white'}}>{currentDate.hours}: {currentDate.min}</Text>
                    </View>

                    <View style={styles.itemCenter}>
                        <Image source={{uri: iconApi}} style={{width: itemHeight, height: itemHeight}}/>
                    </View>

                    <View style={styles.itemRight}>
                        <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}>{String(item.list[0].main.temp - 273.15).slice(0, 2)}°</Text>
                    </View>
                    
                    </View>
                </ImageBackground>
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
        //borderWidth: 1,
        height: itemHeight,
        width: itemWidth,
        borderRadius: 25,
        marginVertical: itemMargin,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    itemContainer2: {
        //borderWidth: 1,
        height: itemHeight,
        width: itemWidth,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemLeft: {
        //borderWidth: 1,
        marginLeft: itemMargin * 2,
        //alignItems: 'center',
        justifyContent: 'center',
    },
    itemCenter: {
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemRight: {
        //borderWidth: 1,
        marginRight: itemMargin * 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

