import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
//import { setLenguage } from '../store/actions'
import TabNavigation from '../components/tabNavigation'


export default function searchCity() {

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }} >

            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>SEARCH CITY</Text>

            
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