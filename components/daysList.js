import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, ActivityIndicator, FlatList, Animated } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import {setWeatherDay} from '../store/actions'


export default function Weather() {
    const dispatch = useDispatch()

    const {weather} = useSelector((state) => state.reducer)
    const {weatherCity} = useSelector((state) => state.reducer)
    const DATA = weather[weatherCity].list
    const filteredData = DATA.filter(days => days.dt_txt.includes('12:00:00'))


    //-------------------------------------------------------------------------------------------------------------
    const renderItem = ({item, index}) => {
        const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
        ]
    
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [.9, 1, .9]
        })

        const iconCode = item.weather[0].icon
        const iconApi = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
        const dayWeek = new Date(item.dt_txt).getDay()
        const dayName = ['Sabato', 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì']
        const monthName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

        return (
            <Animated.View style={[styles.item, {transform: [{scale}]}]} key={index}>
                <View style={{borderWidth: 1}}>
                    <Text style={styles.title}>{dayName[dayWeek]}</Text>
                    <Text>{String(item.main.temp - 273.15).slice(0, 2)}°</Text>
                    <Image source={{uri: iconApi}} style={{width:50, height:50}}/>
                </View>
            </Animated.View>
        )
    }

    const scrollX = React.useRef( new Animated.Value(0) ).current

    const handleScroll = (event) => {
        const positionX = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        const positionY = Math.round(event.nativeEvent.contentOffset.y / ITEM_WIDTH);
        dispatch(setWeatherDay(positionX))
    };

    return(
        <View style={styles.level1} >

            <Animated.FlatList 
                data={filteredData}
                renderItem={renderItem}
                horizontal={true}
                style={styles.containerList}
                snapToInterval={ITEM_WIDTH}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.contentContainer}
                onScroll={
                        Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {useNativeDriver: true,
                        listener: (event) => handleScroll(event)}
                        )}
                    
                bounces={false}
                showsHorizontalScrollIndicator={false}
                decelerationRate={'normal'}
                removeClippedSubviews={true}
            />

        </View>
    );
}

const { width, height } = Dimensions.get('window');

const ITEM_VIEW_WIDTH = width * 0.36;
const ITEM_MARGIN = ITEM_VIEW_WIDTH / 20;
const ITEM_WIDTH = ITEM_VIEW_WIDTH + ITEM_MARGIN;
const ITEM_HEIGHT = height * 0.30;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

const styles = StyleSheet.create({
      level1: {
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-around',
        //backgroundColor: 'white',
      },
      //-------------------------------------------------------------------------
    contentContainer: {
        paddingHorizontal: ITEM_SPACING,    //  per farlo partire dal centro
    },
    containerList: {
        height: ITEM_HEIGHT,
        flexGrow: 0,    // per accedere alle regolazione altezza
    },
    item: {
        backgroundColor: 'white',
        width: ITEM_VIEW_WIDTH,
        marginHorizontal: ITEM_MARGIN / 2,
        alignItems: 'center', 
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 25,
    },
    title: {
        fontSize: 24,
    },
})
