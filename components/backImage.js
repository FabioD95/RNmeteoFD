import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, ImageBackground } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'


export function backImage(iconCode) {
    // const {weather} = useSelector((state) => state.reducer)
    // const {weatherCity} = useSelector((state) => state.reducer)
    // const DATA = weather[weatherCity]
    //const iconCode = DATA.list[0].weather[0].icon
    //console.log(iconCode)

    const clear_day = require('../image/clear_day.png')
    const clear_night = require('../image/clear_night.png')
    const cloud_day = require('../image/cloud_day.png')
    const dark_night = require('../image/dark_night.png')
    const few_clouds_day = require('../image/few_clouds_day.png')
    const mist = require('../image/mist.png')
    const snow = require('../image/snow.png')
    const thunder = require('../image/thunder.png')

    let backImage = clear_day
    //console.log('1 ', backImage)

    if (iconCode == '01d') backImage = clear_day
    if (iconCode == '01n') backImage = clear_night
    if (iconCode == '02d') backImage = few_clouds_day
    if (iconCode == '02n' || iconCode == '03n' || iconCode == '04n') backImage = clear_night
    if (iconCode == '03d' || iconCode == '04d') backImage = cloud_day
    if (iconCode == '02n' || iconCode == '03n' || iconCode == '13n' || iconCode == '50n') backImage = clear_night
    if (iconCode == '09n' || iconCode == '10n') backImage = dark_night
    if (iconCode == '11n' || iconCode == '11d') backImage = thunder
    if (iconCode == '02n' || iconCode == '03n') backImage = clear_night
    if (iconCode == '13d') backImage = snow
    if (iconCode == '50d') backImage = mist
    //console.log('2 ', backImage)

    return backImage
}
