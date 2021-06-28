import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions, ActivityIndicator, FlatList, Animated } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'



export default function midleCityView() {
    const {weather} = useSelector((state) => state.reducer)
    const {weatherCity} = useSelector((state) => state.reducer)
    const DATA = weather[weatherCity].list
    const filteredData = DATA.filter(days => days.dt_txt.includes('12:00:00'))
    const indexDay = Number(String(DATA[0].dt_txt).slice(11, 13))/3
    const firstDay = 9 - indexDay
    const dataFirstDay = DATA.slice(0, firstDay)
    const {weatherDay} = useSelector((state) => state.reducer)
    
    let daysData = 0

    if(weatherDay > 0) daysData = DATA.slice((weatherDay * 8 - indexDay) + 1, (weatherDay * 8 - indexDay) + 9) 
    else daysData = dataFirstDay

    //-------------------------------------------------------------------------------------------------------------
    const renderItem = ({item, index}) => {
        const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
        ]
    
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0.7, 0.9]
        })

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0.7, 0.9]
        })

        // const iconCode = item.weather[0].icon
        // const iconApi = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
        // const dayWeek = new Date(item.dt_txt).getDay()
        // const dayName = ['Sabato', 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì']
        // const monthName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

        return (
            <Animated.View style={[styles.item, {transform: [{scale}], opacity}]} key={index}>
                <View style={{alignItems: 'center', height: '100%', justifyContent: 'center'}}>
                    <View style={{position: 'absolute', top: 30}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{(String(item.dt_txt).slice(11, 13))}:00</Text>
                    </View>
                    

                    <View style={{borderWidth: 0, height: 30, width: 30, borderRadius: 45, position: 'absolute', top: (ITEM_HEIGHT / 2 - 15), backgroundColor: 'white'}}></View>
                    
                    <View style={{position: 'absolute', bottom: 30}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{String(item.main.temp - 273.15).slice(0, 2)}°</Text>
                    </View>
                </View>
            </Animated.View>
        )
    }

    const scrollX = React.useRef( new Animated.Value(0) ).current

    const handleScroll = (event) => {
        const positionX = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        const positionY = Math.round(event.nativeEvent.contentOffset.y / ITEM_WIDTH);
        //setMapTime(positionX)
    };

    return(
        <View style={styles.level1} >

            <Animated.FlatList 
                data={daysData}
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

const ITEM_VIEW_WIDTH = width * 0.15;
const ITEM_MARGIN = 12;
const ITEM_WIDTH = ITEM_VIEW_WIDTH + ITEM_MARGIN;
const ITEM_HEIGHT = height * 0.22;
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
        paddingRight: 160,
    },
    containerList: {
        height: ITEM_HEIGHT,
        flexGrow: 0,    // per accedere alle regolazione altezza
        //borderWidth: 1
    },
    item: {
        //backgroundColor: 'white',
        width: ITEM_VIEW_WIDTH,
        marginHorizontal: ITEM_MARGIN / 2,
        alignItems: 'center', 
        //borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 25,
    },
    title: {
        fontSize: 24,
    },
})
