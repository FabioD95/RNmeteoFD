import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import TabNavigation from '../components/tabNavigation'
import { Feather } from '@expo/vector-icons';
import {colors} from '../components/color'
import CityList from '../components/cityList'
import axios from 'axios'
import {setWeather} from '../store/actions'
import MidleCityView from '../components/midleCityView';


export default function Home() {

    const dispatch = useDispatch()
    const {myCity} = useSelector((state) => state.reducer)

    const APIKEY = '631599cb739a7854c6ea3a2c460af665'

    { myCity.map((item, index) => {
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${item}&APPID=${APIKEY}&lang=it`
    
        useEffect(() => {
            axios.get(url).then(response => dispatch(setWeather(response.data)));
        }, []);
    })}
    
    

    return(
        <View style={styles.container} >

            <View style= {styles.welcomeText}>
                <Text style={styles.mainText}>Good morning!</Text>
                <Text style={styles.mainText}>Alessandro e Francesco</Text>
            </View>
            

            <TouchableOpacity style={styles.touchAddCity}>
                <Feather name="plus-square" size={26} color={colors.darkBlue} />
                <Text style={styles.textAddCity}>Aggiungi città</Text>
            </TouchableOpacity>

            <View style={styles.cityList}>
                <CityList />
            </View>

            {/* <MidleCityView /> */}
            
            <View style={styles.header}>
                <TabNavigation />
            </View>
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
        width: '100%',
    },
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
    welcomeText: {
        marginTop: Platform.OS == 'ios' ? TabNavigationMarginBottom + 30 : TabNavigationMarginBottom
    },
    mainText: {
        fontSize: 26, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color: colors.darkBlue,
    },
    textAddCity: {
        fontSize: 22, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color: colors.darkBlue,
        marginLeft: 15,
    },
    touchAddCity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cityList: {
        //borderWidth: 2,
        marginBottom: cityListMarginBottom,
    }
})