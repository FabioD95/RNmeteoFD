import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
//import { setLenguage } from '../store/actions'
import TabNavigation from '../components/tabNavigation'
import DaysList from '../components/daysList';
import TopCityView from '../components/topCityView';
import MidleCityView from '../components/midleCityView';


export default function cityWeather() {

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }} >

            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>CITY WEATHER</Text>

            <TopCityView />

            <MidleCityView />

            <DaysList />
            
            <View style={styles.header}>
                <TabNavigation />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
})