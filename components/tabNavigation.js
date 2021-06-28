import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, Modal } from 'react-native';
import { AntDesign, Feather, Fontisto, Foundation } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {colors} from './color'


export default function tabNavigation() {
    const navigation = useNavigation();
    
    const route = useRoute();

    let colorIcon = {
        Home: 'grey',
        SearchCity: 'grey',
        FindCityAroundMe: 'grey',
    }

    let bottomWidth = {
        Home: 0,
        SearchCity: 0,
        FindCityAroundMe: 0,
    }

    if (route.name == 'Home') colorIcon.Home = colors.darkBlue, bottomWidth.Home = 2
    if (route.name == 'SearchCity') colorIcon.SearchCity = colors.darkBlue, bottomWidth.SearchCity = 2
    if (route.name == 'FindCityAroundMe') colorIcon.FindCityAroundMe = colors.darkBlue, bottomWidth.FindCityAroundMe = 2

  return(
    <View style={styles.container} >
        
        <AntDesign name="home" size={iconSize} color={colorIcon.Home} style={[styles.icon, {borderBottomWidth: bottomWidth.Home}]} onPress={() => {navigation.navigate('Home')}}/>

        <AntDesign name="search1" size={iconSize} color={colorIcon.SearchCity} style={[styles.icon, {borderBottomWidth: bottomWidth.SearchCity}]} onPress={() => {navigation.navigate('SearchCity')}}/>

        <Feather name="map-pin" size={iconSize} color={colorIcon.FindCityAroundMe} style={[styles.icon, {borderBottomWidth: bottomWidth.FindCityAroundMe}]} onPress={() => {navigation.navigate('FindCityAroundMe')}}/>

        {/* <Fontisto name="day-cloudy" size={24} color={'red'} style={styles.icon} onPress={() => {navigation.navigate('CityWeather')}}/> */}
        
    </View>
  );
}

//Platform.OS == 'ios' ? 60 : 50,
//const marginIcon = Platform.OS == 'ios' ? 15 : 0;
const { width, height } = Dimensions.get('window');
const iconSize = height * 0.040
const containerHeight = height * 0.093
const marginHorizontal = width * 0.05
const containerWidth = width * 0.90
const containerMarginBottom = height * 0.022

const styles = StyleSheet.create({
    container: {
        height: containerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        marginBottom: containerMarginBottom,
        marginHorizontal: marginHorizontal,
        width: containerWidth,
        borderRadius: 25,
        elevation: 10,
    },
    icon: {
        padding: (containerHeight - iconSize) / 2.2, 
        borderBottomColor: colors.darkBlue,
    }
})