import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, ImageBackground } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
//import { setLenguage } from '../store/actions'
import TabNavigation from '../components/tabNavigation'
import DaysList from '../components/daysList';
import TopCityView from '../components/topCityView';
import MidleCityView from '../components/midleCityView';
import {backImage} from '../components/backImage';


export default function cityWeather() {
    const {weather} = useSelector((state) => state.reducer)
    const {weatherCity} = useSelector((state) => state.reducer)
    const DATA = weather[weatherCity]
    const iconCode = DATA.list[0].weather[0].icon

    return(
        <View style={{flex: 1}}>
        <ImageBackground source={backImage(iconCode)} style={{width: '100%'}} blurRadius={10} >
            <View style={styles.container} >
                <View style={styles.containerView}>
                    <TopCityView />

                    <MidleCityView />

                    <DaysList />
                </View>
                
                <View style={styles.header}>
                    <TabNavigation />
                </View>
            </View>
        </ImageBackground>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const TabNavigationHeight = height * 0.093
const TabNavigationMarginBottom = height * 0.022
const cityListMarginBottom = TabNavigationHeight + TabNavigationMarginBottom 

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    container: {
        //flex: 1, 
        alignItems: 'center', 
        //justifyContent: 'space-between',
        //borderWidth: 2, 
        borderColor: 'red',
        height: '100%'
    },
    containerView: {
        //borderWidth: 1,
        //height: height - (height * 0.137),
        marginTop: Platform.OS == 'ios' ? TabNavigationMarginBottom + 40 : TabNavigationMarginBottom + 10,
        marginBottom: TabNavigationMarginBottom,
        justifyContent: 'space-between',
    }
})